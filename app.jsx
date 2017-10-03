class Model {
  constructor () {
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
    this.callback = null;
  }
  
  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  sum () {
    return this.players.map(player => { return player.score;}).reduce((playerA,playerB)=>{
      return (playerB + playerA);
    });
  }

  // increment (e) {
  //   let id = e.evetTarget;
  //   Console.log(e);
  //   let actual = this.players[id-1];
  //   return actual.score = actual.score + 1;
  // }
}

const Header = ({model}) => {
  return (<div className='header'>
            <table className='stats'>
              <tbody >
                <tr><td>PLAYERS: </td><td>{model.players.length}</td>
                </tr>
                <tr><td>TOTAL POINTS: </td><td>{model.sum()}</td></tr>
              </tbody>
            </table>
          <div className='stopwatch' >
            <h2>STOPWHATH</h2>
            <h1 className='stopwatch-time'>0</h1>
            <button>START</button>
            <button>RESET</button>
          </div>
        </div>);
};


const PlayerForm = ({}) => {
  return (
    <div className='add-player-form'>
      <form>
        <input type="text" placeholder="ENTER A NAME"/>
        <input type='submit' value='ADD PLAYER'/>
      </form>
    </div>
  );
};

const Score = ({model}) => {
  const getPlayers = () => {
    console.log(model.players)
    return model.players.map((player, index) => {
      return (<div className='player' key={index}>
                <div className='player-name'>{player.name}</div>
                <div className='player-score counter'>
                  <button className='counter-action decrement' onClick={
                    (e)=>{
                      {/* model.decrement(e) */}
                    console.log(e.target.parentNode.childNodes[1].id);  
                  }}>-</button>
                  <div className='counter-score' id={player.id}>{player.score}</div>
                  <button className='counter-action  increment' onClick={()=>model.increment()}>+</button>
                </div>
              </div>);
    });
  }
  return (<div className='scoreboard'>
            <Header model={model}/>
            {getPlayers()}
            <PlayerForm/>
          </div>);
}

let model = new Model();
let counter = 1;

let render = () => {
  console.log('render times: ', counter++);
  ReactDOM.render(<Score title="Scoreboard" model={model}/>, document.getElementById('container'));

};
model.subscribe(render); 
render(); 