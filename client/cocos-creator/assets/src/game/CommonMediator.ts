import { puremvc } from "../lib/puremvc";

export enum E_COMMON_MEDIATOR_EVENT {
    SERVER_CONNECTED,

}
export default class CommonMediator extends puremvc.Mediator {
    static eventObj: { [key in E_COMMON_MEDIATOR_EVENT]?: symbol } = {}
    constructor() {
        super("CommonMediator");
    }
    listNotificationInterests(): any[] {
        return this.getNotificationSymbols();
    }
    getNotificationSymbols(): Symbol[] {
        let _res = [];
        for (const key in E_COMMON_MEDIATOR_EVENT) {
            if (!isNaN(+key)) {
                let _sym = Symbol();
                CommonMediator.eventObj[+key] = _sym;
                _res.push(_sym);
            }
        }
        return _res;
    }
    handleNotification(notification: any): void {
        switch (notification.getName()) {
            case CommonMediator.eventObj[E_COMMON_MEDIATOR_EVENT.SERVER_CONNECTED]:
                
                break;
        }
    }
}