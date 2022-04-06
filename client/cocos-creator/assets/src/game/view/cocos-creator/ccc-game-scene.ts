import { IGameSceneView } from './../GameSceneMediator';
import { puremvc } from './../../../lib/puremvc';
import GameFacade from "../../GameFacade";
import GameSceneMediator from "../GameSceneMediator";

const { ccclass } = cc._decorator;

@ccclass
export default class CCC_Game_Scene extends cc.Component implements IGameSceneView {
    onLoad() {
        new GameFacade();
    }

    getGameFacade(): GameFacade {
        return puremvc.Facade.getInstance("GameFacade") as GameFacade;
    }

    start() {
        this.getGameFacade().registerMediator(new GameSceneMediator(this.node, this));
    }

    getViewComponent(compName: string) {
        return cc.find("Canvas/" + compName);
    }
    getNewViewComponent(comp) {
        return cc.instantiate(comp)
    }
    getChild(childPath, parent) {
        return cc.find(childPath, parent);
    }
    addClickListener(comp, handler, target) {
        comp.on(cc.Node.EventType.TOUCH_START, handler, target);
    }
    setCard(card, name) {
        let _faceValLabel = this.getChild("val", card);
        _faceValLabel.getComponent(cc.Label).string = name;
        card.active = true;
    }
    setLabel(label, text) {
        label.getComponent(cc.Label).string = text;
    }
    removeAllChildren(parent) {
        parent.removeAllChildren();
    }
    addChild(child, parent) {
        parent.addChild(child);
    }
}
