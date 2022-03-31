import { GameStart_S2C } from './../../proto/protobuf_bundle.d';
import GameModel from '../model/GameModel';
import { puremvc } from "../../lib/puremvc";
import * as card_game_pb from "../../proto/protobuf_bundle";
import { Net } from './Net';
import Encoder from './Encoder';
import GameSceneMediator, { EGAME_SCENE_EVENT } from '../view/GameSceneMediator';
import GameFacade from '../GameFacade';

export class NetMediator extends puremvc.Mediator {
    constructor(private mEncoder = new Encoder()) {
        super("NetMediator");
    }
    listNotificationInterests() {
        return this.getNotificationNames();
    }
    getNotificationNames(): string[] {
        let _res = [];
        for (const key in card_game_pb.Cmd) {
            if (!isNaN(+key)) _res.push(key);
        }
        return _res;
    }
    handleNotification(notification: puremvc.INotification) {
        let _msgName: string = card_game_pb.Cmd[notification.getName()];
        let _data: string = notification.getBody();
        if (this[_msgName]) this[_msgName](_data);
    }
    private getGameModel(): GameModel {
        return puremvc.Facade.getInstance("GameFacade").retrieveProxy("GameModel");
    }
    private getGameFacade(): GameFacade {
        return puremvc.Facade.getInstance("GameFacade") as GameFacade;
    }
    private send(data) {
        let _dataBuffer = this.mEncoder.encodeData(data);
        if (_dataBuffer) Net.ins.send(_dataBuffer);
    }
    //=== receive begin ===
    private COMPETEFORLANDLORDROLE_S2C(data) {
        let _curMaxScore = data.curMaxScore;
        let _seatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        if (_seatNumber == _gameModel.mainServerSeatNumber) {
            let _notifNameSymbol = GameSceneMediator.eventObj[EGAME_SCENE_EVENT.COMPETE_FOR_LANDLORD_S2C];
            this.getGameFacade().sendNotification(_notifNameSymbol, { curMaxScore: _curMaxScore });
        }
    }
    private DEALCARDS_S2C(data) {
        let _cards = data.cards;

        let _gameModel = this.getGameModel();
        let _cardsSorted = _gameModel.sortByValue(_cards);
        _gameModel.cardsArr = _cardsSorted;

        let _notifNameSymbol = GameSceneMediator.eventObj[EGAME_SCENE_EVENT.DEAL_CARDS_S2C];
        this.getGameFacade().sendNotification(_notifNameSymbol, _cardsSorted);
    }
    private PLAYTURN_S2C(data) {
        let _seatNumber = data.seatNumber;
        let _notifNameSymbol = GameSceneMediator.eventObj[EGAME_SCENE_EVENT.PLAYTURN_S2C];
        this.getGameFacade().sendNotification(_notifNameSymbol, _seatNumber);
    }
    private PLAYCARDS_S2C(data) {
        let _cardsPlayed = data.cards;
        let _seatNumber = data.seatNumber;

        if (_cardsPlayed.length == 0) {
            console.log(`Player ${_seatNumber}-> passed.`)
        } else {
            if (_seatNumber == this.getGameModel().mainServerSeatNumber) {
                this.getGameModel().removePlayerCards(_cardsPlayed);
                this.getGameFacade().sendNotification(GameSceneMediator.eventObj[EGAME_SCENE_EVENT.REFRESH_HAND_CARDS_VIEW]);
            }
            this.getGameFacade().sendNotification(GameSceneMediator.eventObj[EGAME_SCENE_EVENT.PLAYCARDS_S2C], { cards: _cardsPlayed, seatNumber: _seatNumber });
        }
    }
    private ILLEGALCARDS_S2C(data) {
        console.log("Illegal Cards.");
    }
    private GAMEEND_S2C(data) {
        let _winnerSeatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        let _isWin = _winnerSeatNumber === _gameModel.mainServerSeatNumber;
        let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
        console.log(_content);
        _gameModel.resetWhenGameEnd();

        this.getGameFacade().sendNotification(GameSceneMediator.eventObj[EGAME_SCENE_EVENT.GAME_END_S2C]);
    }
    private GAMESTART_S2C(data) {
        console.log("Game start.");

        let _gameModel = this.getGameModel();
        _gameModel.mainServerSeatNumber = data.seatNumber;
        _gameModel.playerID = data.playerId;
        _gameModel.playerCount = data.playerCount;

        this.getGameFacade().sendNotification(GameSceneMediator.eventObj[EGAME_SCENE_EVENT.GAME_START_S2C]);
        this.getGameFacade().sendNotification(GameSceneMediator.eventObj[EGAME_SCENE_EVENT.SHOW_PLAYER_INFO_VIEW], { playerID: data.playerId, seatNumber: data.seatNumber });
    }
    private BROADCAST_MSG_S2C(data) {
        let _msg = data.msg;
        console.log(_msg);
    }
    //=== receive end ===
    //=== send begin ===
    private reqStartGame() {
        this.send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
    }
    private PLAYCARDS_C2S(cardsSerial: number[]) {
        let _gameModel = this.getGameModel();
        let _seatNumber = _gameModel.mainServerSeatNumber;
        this.send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: cardsSerial, seatNumber: _seatNumber } });
    }
    private READY_C2S() {
        this.send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
    }
    private COMPETEFORLANDLORDROLE_C2S(data) {
        let _score = data;

        let _gameModel = this.getGameModel();
        this.send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: _score, seatNumber: _gameModel.mainServerSeatNumber } });
    }
    //=== send end ===
}