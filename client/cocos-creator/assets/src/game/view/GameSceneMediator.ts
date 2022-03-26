import { puremvc } from "../../lib/puremvc";

export default class GameSceneMediator extends puremvc.Mediator{
    constructor(viewComponent) {
        super("GameSceneMediator",viewComponent);
    }
    listNotificationInterests() {
        return [];
    }

    onRegister(): void {
        
    }
}