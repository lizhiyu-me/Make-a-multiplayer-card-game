import GameModel from './model/GameModel';
import { puremvc } from "../lib/puremvc";
import CommonMediator from './CommonMediator';

export default class GameFacade extends puremvc.Facade {
    constructor() {
        super("GameFacade");

        this.registerProxy(new GameModel());
        this.registerMediator(new CommonMediator());
    }

}