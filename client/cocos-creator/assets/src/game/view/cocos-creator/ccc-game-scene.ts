// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameFacade from "../../GameFacade";
import GameSceneMediator from "../GameSceneMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CCC_Game_Scene extends cc.Component {

    @property(cc.Label)
    status: cc.Label = null;

    @property(Node)
    handList: Node = null;
    @property(Node)
    controlPanel: Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let _gameFacade = new GameFacade();
        _gameFacade.registerMediator(new GameSceneMediator(this.node));
    }

    start () {

    }

    // update (dt) {}
}
