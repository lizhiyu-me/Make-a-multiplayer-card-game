import { puremvc } from "../lib/puremvc";
import { NetMediator } from "./NetMediator";

export class NetFacade extends puremvc.Facade {
    static NAME:string = "NetFacade";
    constructor() {
        super(NetFacade.NAME);

        this.registerMediator(new NetMediator());
    }
}