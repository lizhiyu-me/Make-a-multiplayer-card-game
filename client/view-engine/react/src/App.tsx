import Card from './component/card';
import GameModel from './base/src/game/model/GameModel';
import { useEffect, useState } from 'react';
import GameSceneMediator from './base/src/game/view/GameSceneMediator';
import GameSceneView from './component/GameSceneView';

export default function App(props: any) {
  let _gameFacade = props.gameFacade;
  let _gameModel: GameModel = _gameFacade.retrieveProxy("GameModel");
  let [mainHandCards, setMainHandCards] = useState(_gameModel.cardsArr);
  let [outCards, setOutCards] = useState(_gameModel.outCards);
  _gameModel.setMainHandCardsHook(setMainHandCards);
  _gameModel.setOutCardsHook(setOutCards);
  let _cardCount = mainHandCards.length;
  let _beginX = (-_cardCount * 40 - 60) / 2;
  useEffect(() => {
    console.log(1123);
    if (_gameFacade.retrieveMediator("GameSceneMediator") == null) {
      _gameFacade.registerMediator(new GameSceneMediator(this, new GameSceneView()));
    }
  });
  return (
    <div className="App">
      <div>
        <div id="status" style={{display:'fix',textAlign:'center',fontSize:"3em"}}>hello</div>
        <div id='controlPanel-scores' className='controlPanel'>
          <button id='controlPanel-scores-1' className='controlButton'>1</button>
          <button id='controlPanel-scores-2' className='controlButton'>2</button>
          <button id='controlPanel-scores-3' className='controlButton'>3</button>
        </div>

        <div id='controlPanel-operation' className='controlPanel'>
          <button id='controlPanel-operation-pass' className='controlButton'>pass</button>
          <button id='controlPanel-operation-play' className='controlButton'>play</button>
        </div>
        <div id="outlist-0" className='out-list-main'>
          {outCards[0].map((serial, idx) => {
            return (<Card key={"k" + serial} face={_gameModel.getCardReadableName(serial)} idx={idx} beginX={_beginX} serial={serial} />)
          })
          }
        </div>
        <div id="outlist-1" className='out-list-right'>
          {
            outCards[1].map((serial, idx) => {
              return (<Card key={"k" + serial} face={_gameModel.getCardReadableName(serial)} idx={idx} beginX={_beginX} serial={serial} />)
            })
          }
        </div>
        <div id="outlist-2" className='out-list-left'>
          {
            outCards[2].map((serial, idx) => {
              return (<Card key={"k" + serial} face={_gameModel.getCardReadableName(serial)} idx={idx} beginX={_beginX} serial={serial} />)
            })
          }
        </div>
        <div id='handList' className="bottom-center">
          {mainHandCards.map((serial: number, idx) => {
            return (<Card key={"k" + serial} face={_gameModel.getCardReadableName(serial)} idx={idx} beginX={_beginX} serial={serial} />)
          })}
        </div>
      </div>
    </div>
  );
}
