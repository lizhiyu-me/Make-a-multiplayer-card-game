import Card from './component/card';
import GameModel from './base/src/game/model/GameModel';
import { useEffect, useState } from 'react';
import GameSceneMediator from './base/src/game/view/GameSceneMediator';
import GameSceneView from './GameSceneView';

function App(props: any) {
  let _gameFacade = props.gameFacade;
  let _gameModel: GameModel = _gameFacade.retrieveProxy("GameModel");
  let [cardArr, setCardArr] = useState(_gameModel.cardsArr);
  _gameModel.setCardsArrHook(setCardArr);
  //TEST:
  /* setTimeout(() => {
    _gameModel.cardsArr = [1];
  }, 1000); */
  let _cardCount = cardArr.length;
  let _beginX = (-_cardCount * 40 -60) / 2 ;
  useEffect(() => {
    if (_gameFacade.retrieveMediator("GameSceneMediator") == null) {
      _gameFacade.registerMediator(new GameSceneMediator(this, new GameSceneView()));
    }
  });
  return (
    <div className="App">

      <Card id="card-clone" style={{ visibility: "hidden" }} ></Card>

      <div>
        <div id='controlPanel-scores' className='controlPanel'>
          <button id='controlPanel-scores-1' className='controlButton'>1</button>
          <button id='controlPanel-scores-2' className='controlButton'>2</button>
          <button id='controlPanel-scores-3' className='controlButton'>3</button>
        </div>

        <div id='controlPanel-operation' className='controlPanel'>
          <button id='controlPanel-operation-pass' className='controlButton'>pass</button>
          <button id='controlPanel-operation-play' className='controlButton'>play</button>
        </div>

        <div id='handList' className="bottom-center">
          {/* classic react implementation */}
          {cardArr.map((serial:number,idx) => {
            return (<Card key={"k"+serial} face={_gameModel.getCardReadableName(serial)} idx={idx} beginX={_beginX} serial={serial}/>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
