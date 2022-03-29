import { puremvc } from './../../../lib/puremvc';
import GameFacade from "../../GameFacade";
import GameSceneMediator from "../GameSceneMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CCC_Game_Scene extends cc.Component {
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
