'use strict';

class Model {
  constructor() {
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
      {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
      {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      },
    ];
    this.id = this.players.length;
    this.player = '';
    this.callback = null;
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  sum() {
    return this.players.map(player => { return player.score; }).reduce((playerA, playerB) => {
      return (playerB + playerA);
    });
  }

  increment(e) {
    let id = e.target.parentNode.childNodes[1].id;
    let actual = this.players[id - 1];
    actual.score = actual.score + 1;
    this.callback();
  }

  decrement(e) {
    let id = e.target.parentNode.childNodes[1].id;
    let actual = this.players[id - 1];
    if (actual.score > 0) {
      actual.score = actual.score - 1;
      this.callback();
    }
  }

  addPlayer() {
    this.players.push({
      name: this.player,
      score: 0,
      id: this.id + 1,
    });
    this.player = '';
    this.callback();
  }

  onChange(e) {
    console.log(e.target.value)
    this.player = e.target.value;
    this.callback();
  }

  onSubmit(e) {
    e.preventDefault();
    this.addPlayer();
  }
}

const Header = ({ model }) => {
  return (
  <div className='header'>
    <table className='stats'>
      <tbody >
        <tr><td>PLAYERS: </td><td>{model.players.length}</td>
        </tr>
        <tr><td>TOTAL POINTS: </td><td>{model.sum()}</td></tr>
      </tbody>
    </table>
    <StopWatch />
  </div>);
};

// COMPONENTE STOPWHATCH incluido en el componente HEADER
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      toggleBtn: 'START',
    };
    this.myCounter = 0;
  }
  render() {
    const toggleTimer = (e) => {
      if (this.state.toggleBtn == 'STOP') {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    }
    const reset = (e) => {
      this.resetTimer();
    }
    return (
      <div className='stopwatch' >
        <h2>STOPWATCH</h2>
        <h1 className='stopwatch-time'>{this.state.counter}</h1>
        <button onClick={toggleTimer}>{this.state.toggleBtn}</button>
        <button onClick={reset}>RESET</button>
      </div>
    );
  }
  startTimer() {
    this.setState({
      counter: this.myCounter,
      toggleBtn: 'STOP',
    });
    this.timer = setInterval(() => {
      this.myCounter = this.myCounter + 1;
      this.setState({
        counter: this.myCounter,
      });
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
    this.setState({
      toggleBtn: 'START',
    });
  }
  resetTimer() {

    clearInterval(this.timer);
    this.myCounter = 0;
    this.setState({
      toggleBtn: 'START',
      counter: 0
    });
  }
}

const PlayerForm = ({ }) => {
  return (
    <div className='add-player-form'>
      <form onSubmit={e => { model.onSubmit(e) }}>
        <input type="text" placeholder="ENTER A NAME" value={model.player} onChange={e => { model.onChange(e) }} />
        <input type='submit' value='ADD PLAYER' />
      </form>
    </div>
  );
};

const Score = ({ model }) => {
  const getPlayers = () => {
    return model.players.map((player, index) => {
      return (
      <div className='player' key={index}>
        <div className='player-name'>{player.name}</div>
        <div className='player-score counter'>
          <button className='counter-action decrement' onClick={
            (e) => model.decrement(e)}>-</button>
          <div className='counter-score' id={player.id}>{player.score}</div>
          <button className='counter-action  increment' onClick={(e) => model.increment(e)}>+</button>
        </div>
      </div>
      );
    });
  }
  return (
  <div className='scoreboard'>
    <Header model={model} />
    {getPlayers()}
    <PlayerForm />
  </div>);
}


let model = new Model();

let render = () => {
  ReactDOM.render(<Score title="Scoreboard" model={model} />, document.getElementById('container'));
};
model.subscribe(render);
render(); 