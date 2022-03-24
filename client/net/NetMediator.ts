import { puremvc } from "../lib/puremvc";
import * as card_game_pb from "../../share/proto/card-game";

export class NetMediator extends puremvc.Mediator {
    static NAME: string = "NetMediator";
    constructor() {
        super(NetMediator.NAME);
    }
    listNotificationInterests() {
        return (
            () => {
                let _res = [];
                for (const key in card_game_pb.Cmd) {
                    let _cmd = +key;
                    if (!isNaN(_cmd)) _res.push(key);
                }
                return _res;
            }
        )();
    };
    handleNotification(notification) {
        let _msgName: string = notification.name;
        let _data: string = notification.getBody();
        if (this[_msgName]) this[_msgName](_data);
        
    };
}