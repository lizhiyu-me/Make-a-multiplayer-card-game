import { puremvc } from "../../lib/puremvc";
export default abstract class BaseMediator extends puremvc.Mediator {
    constructor(name: string, viewCompnent?) {
        super(name, viewCompnent);
    }
    getNotificationSymbols(E, mediatorClass): Symbol[] {
        let _res = [];
        for (const key in E) {
            if (!isNaN(+key)) {
                let _sym = Symbol();
                mediatorClass.eventObj[+key] = _sym;
                _res.push(_sym);
            }
        }
        return _res;
    }
}