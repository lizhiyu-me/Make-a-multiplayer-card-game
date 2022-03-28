import { puremvc } from './../../../lib/puremvc';
import GameFacade from "../../GameFacade";
import GameSceneMediator from "../GameSceneMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CCC_Game_Scene extends cc.Component {

    @property(cc.Label)
    status: cc.Label = null;

    @property(cc.Node)
    handList: cc.Node = null;
    @property(cc.Node)
    controlPanel: cc.Node = null;


    onLoad() {
        new GameFacade();
    }

    getGameFacade(): GameFacade {
        return puremvc.Facade.getInstance("GameFacade") as GameFacade;
    }

    start() {
        this.getGameFacade().registerMediator(new GameSceneMediator(this.node));
    }

}
