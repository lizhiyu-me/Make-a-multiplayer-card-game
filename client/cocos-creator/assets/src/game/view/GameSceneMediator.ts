import { puremvc } from "../../lib/puremvc";
import BaseMediator from "../base/BaseMediator";
import CCC_Game_Scene from "./cocos-creator/ccc-game-scene";
import * as card_game_pb from "../../proto/protobuf_bundle";

export enum EGAME_SCENE_EVENT {
    COMPETE_FOR_LANDLORD,
}
export default class GameSceneMediator extends BaseMediator {
    static eventObj: { [key in EGAME_SCENE_EVENT]?: symbol } = {};
    constructor(viewComponent) {
        super("GameSceneMediator", viewComponent);
    }
    listNotificationInterests() {
        return this.getNotificationSymbols(EGAME_SCENE_EVENT, GameSceneMediator);
    }
    handleNotification(notification: any): void {
        let _nameSymbol = notification.getName();
        switch (_nameSymbol) {
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.COMPETE_FOR_LANDLORD]:
                console.log("123")
                break;
        }
    }

    onRegister(): void {
        this.getViewClass().status.string = "GameSceneMediator";

        (puremvc.Facade.getInstance("NetFacade") as puremvc.Facade).sendNotification(card_game_pb.Cmd.READY_C2S);
    }

    private getViewClass(): CCC_Game_Scene {
        return this.getViewComponent().getComponent(CCC_Game_Scene);
    }
}