import BaseMediator from "./base/BaseMediator";

export enum ECOMMON_MEDIATOR_EVENT {
    // SERVER_CONNECTED,
}
export default class CommonMediator extends BaseMediator {
    static eventObj: { [key in ECOMMON_MEDIATOR_EVENT]?: symbol } = {};
    constructor() {
        super("CommonMediator");
    }
    listNotificationInterests(): Symbol[] {
        return this.getNotificationSymbols(ECOMMON_MEDIATOR_EVENT,CommonMediator);
    }
    handleNotification(notification: any): void {
        let _nameSymbol = notification.getName();
        switch (_nameSymbol) {
            // case CommonMediator.eventObj[ECOMMON_MEDIATOR_EVENT.SERVER_CONNECTED]:
            //     console.log("server connected")
            //     break;
        }
    }
}