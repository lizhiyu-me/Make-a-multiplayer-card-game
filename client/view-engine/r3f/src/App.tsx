import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css"
import Card from './component/Card';
import GameModel from "./base/src/game/model/GameModel";
import GameSceneMediator from "./base/src/game/view/GameSceneMediator";
import GameSceneView from "./component/GameSceneView";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  camera.position.set(0, 0, 10);
  const controls = useRef();
  useFrame((state) => {
    (controls.current as unknown as OrbitControls).update()
  });
  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 4}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
      rotationSpeed={0.01}
    />
  );
};

const R3fScene = (props: { mainHandCards: number[], gameModel, outCards: number[][] }) => {
  const {
    scene,
    camera,
  } = useThree();
  useEffect(() => {
    console.log(scene.getObjectByName("handList"))
  })
  let mainHandCards = props.mainHandCards;
  let _gameModel = props.gameModel;
  _gameModel.context = scene;
  function getFaceTextureUrl(serial): string {
    let _prefix = "/faces/"
    let _readableName = _gameModel.getCardReadableName(serial);
    if (_readableName === "rJkr") return _prefix + "Poker_Joker_B.png"
    else if (_readableName === "bJkr") return _prefix + "Poker_Joker_R.png"
    else {
      let _suitDic = { 0: "D", 1: "C", 2: "H", 3: "S" };
      let _suitNumber: number = serial >> 4;
      return _prefix + "Poker_" + _suitDic[_suitNumber] + _readableName + ".png";
    }
  }

  let _cardCount = mainHandCards.length;
  let _beginX = -_cardCount * .5;
  return (
    <>
      <CameraControls />
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />

      <group name="handList">
        {mainHandCards.map((serial: number, idx) => {
          return (<Card key={"k" + serial} faceTextureUrl={getFaceTextureUrl(serial)} idx={idx} beginX={_beginX} serial={serial} />)
        })}
      </group>
      <group position={[2, 4, 0]} scale={.6} name="out-list-1">
        {props.outCards[1].map((serial: number, idx) => {
          return (<Card key={"k" + serial} faceTextureUrl={getFaceTextureUrl(serial)} idx={idx} beginX={_beginX} serial={serial} />)
        })}
      </group>
      <group position={[-2, 4, 0]} scale={.6} name="out-list-2">
        {props.outCards[2].map((serial: number, idx) => {
          return (<Card key={"k" + serial} faceTextureUrl={getFaceTextureUrl(serial)} idx={idx} beginX={_beginX} serial={serial} />)
        })}
      </group>
      <group position={[0, 2, 0]} scale={.6} name="out-list-0">
        {props.outCards[0].map((serial: number, idx) => {
          return (<Card key={"k" + serial} faceTextureUrl={getFaceTextureUrl(serial)} idx={idx} beginX={_beginX} serial={serial} />)
        })}
      </group>
    </>
  )
}

function App(props: any) {
  let _gameFacade = props.gameFacade;
  let _gameModel: GameModel = _gameFacade.retrieveProxy("GameModel");
  let [mainHandCards, setMainHandCards] = useState(_gameModel.cardsArr);
  let [outCards, setOutCards] = useState(_gameModel.outCards);
  _gameModel.setMainHandCardsHook(setMainHandCards);
  _gameModel.setOutCardsHook(setOutCards);

  useEffect(() => {
    if (_gameFacade.retrieveMediator("GameSceneMediator") == null) {
      _gameFacade.registerMediator(new GameSceneMediator(null, new GameSceneView()));
    }
  });

  return (
    <>
      <div id='canvas-container'>
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100], rotation: [0, 0, 0] }}>
          <R3fScene mainHandCards={mainHandCards} outCards={outCards} gameModel={_gameModel}></R3fScene>
        </Canvas>
      </div>
      
      <div id="status" style={{ display: 'fix', textAlign: 'center', fontSize: "2em", userSelect: "none" }}>hello</div>
      <div id='controlPanel-scores' className='controlPanel'>
        <button id='controlPanel-scores-1' className='controlButton'>1</button>
        <button id='controlPanel-scores-2' className='controlButton'>2</button>
        <button id='controlPanel-scores-3' className='controlButton'>3</button>
      </div>

      <div id='controlPanel-operation' className='controlPanel'>
        <button id='controlPanel-operation-pass' className='controlButton'>pass</button>
        <button id='controlPanel-operation-play' className='controlButton'>play</button>
      </div>
    </>
  );
}

export default App;
