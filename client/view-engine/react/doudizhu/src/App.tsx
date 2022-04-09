import './App.css';
import Card from './component/card';
import GameModel from './base/src/game/model/GameModel';

let gameModel: GameModel = new GameModel();
function App(props: any) {
  return (
    <div className="App">
      <div>
        <div id='handList' className="bottom-center">
          {props.handListSerials.map((serial:number) => {
            return (<Card face={gameModel.getCardReadableName(serial)}/>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
