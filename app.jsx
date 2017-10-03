const Header = ({players}) => {
  return (
    
      <div className='header'>
        <table className='stats'>
          <tbody >
            <tr>
              <td>PLAYERS: </td>
              <td>{players.length}</td>
            </tr>
            <tr>
              <td>TOTAL POINTS: </td>
              <td>{sum(players)}</td>
            </tr>
          </tbody>
        </table>
      <div className='stopwatch' >
        <h2>STOPWHATH</h2>
        <h1 className='stopwatch-time'>0</h1>
        <button>START</button>
        <button>RESET</button>
      </div>
    </div>
  
  );
};

const PlayerList = ({players}) => {
  return (
    <div>
      <div>{getPlayers(players)}</div>
    </div>
  );
}

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

function sum (players) {
  return players.map(player => { return player.score;}).reduce((playerA,playerB)=>{
    return (playerB + playerA);
  });
};

function getPlayers (players) {
  return players.map((player, index) => {
    return (
      <div className='player' key={index}>
        <div className='player-name'>{player.name}</div>
        <div className='player-score counter'>
              <button className='counter-action decrement'>-</button>
              <div className='counter-score'>{player.score}</div>
              <button className='counter-action  increment'>+</button>
        </div>
      </div>
    );
  });
}

let PLAYERS = [
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

const Application = ({title, players}) => {
  return (
  <div className='scoreboard'>
    <Header players={players}/>
    <PlayerList players={players}/>
    <PlayerForm/>
  </div>
  ) ;
}

ReactDOM.render(<Application title="Scoreboard" players = {PLAYERS}/>, document.getElementById('container'));