import GameModel from './model/GameModel';
import { puremvc } from "../lib/puremvc";

export default class GameFacade extends puremvc.Facade {
    constructor() {
        super("GameFacade");

        this.registerProxy(new GameModel());
    }

}