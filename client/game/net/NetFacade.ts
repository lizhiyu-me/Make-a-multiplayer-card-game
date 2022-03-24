import { puremvc } from "../../lib/puremvc";
import { NetMediator } from "./NetMediator";

export class NetFacade extends puremvc.Facade {
    constructor() {
        super("NetFacade");

        this.registerMediator(new NetMediator());
    }
}