import GameModel from '../model/GameModel';
import { puremvc } from "../../lib/puremvc";
import * as card_game_pb from "../../../share/proto/card-game";
import { Net } from './Net';

export class NetMediator extends puremvc.Mediator {
    constructor() {
        super("NetMediator");
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
        let _msgName: string = card_game_pb.Cmd[notification.name];
        let _data: string = notification.getBody();
        if (this[_msgName]) this[_msgName](_data);

    };

    private getGameModel(): GameModel {
        return (puremvc.Facade.getInstance("GameFacade") as puremvc.Facade).retrieveProxy("GameModel");
    }


    //=== receive begin ===
    private READY_C2S(data) {

    }
    private DEALCARDS_S2C(data) {
        let _cards = data.cards;

        let _gameModel = this.getGameModel();
        _gameModel.cardsArr = _gameModel.sortByValue(_cards);
        // let _myHandCardsShowArr = convert2ReadableNames(this.mCardsArr);
        // console.log('Deal cards complete, your seat number is-> ', data.seatNumber, 'your cards->', _myHandCardsShowArr.join(','));
    }
    private COMPETEFORLANDLORDROLE_C2S(data) {
        let _score = data;
        console.log(`You has called ${data} score`);

        let _gameModel = this.getGameModel();
        this.send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: _score, seatNumber: _gameModel.seatNumber } });
    }
    private COMPETEFORLANDLORDROLE_S2C(data) {
        let _curMaxScore = data.curMaxScore;
        let _seatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        if (_seatNumber == _gameModel.seatNumber) {
            // let _scoreCanBeSelectedStr = "123".slice(_curMaxScore).split("").join("|");
            // console.log(`Select a score to confirm role (you can input ${_scoreCanBeSelectedStr}, the one who select the biggest number will be the land lord, and the base score is the selected number.): `);
            // const _score = this.getInputFromCmd();
            // this.competeForLandLordRole_C2S(_score);
        }
    }
    private PLAYTURN_S2C(data) {
        let _seatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        if (_seatNumber == _gameModel.seatNumber) {
            //update hand cards
            if (data.handCards) _gameModel.cardsArr = _gameModel.sortByValue(data.handCards);
            this.PLAYCARDS_C2S();
        }
    }
    private PLAYCARDS_C2S() {
        console.log('Now, your turn.');
        // console.log('Your cards->', convert2ReadableNames(this.mCardsArr).join(','));
        console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
        let _gameModel = this.getGameModel();
        /* let _inputContent = this.getInputFromCmd();
        if (_inputContent == "" || _gameModel.checkIsCardsLegal(_inputContent)) {
            let _cardsNumberArr = _inputContent == "" ? [] : convert2CardNumbers(_inputContent.split(","));
            this.send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: _cardsNumberArr, seatNumber: this.seatNumber } });
        } else {
            console.log("Illegal cards, please select your cards again.")
            this.playTurn({ seatNumber: this.seatNumber });
        } */
    }
    private PLAYCARDS_S2C(data) {
        let _cardsPlayed = data.cards;
        let _seatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        if (_cardsPlayed.length == 0) {
            console.log(`Player ${_seatNumber}-> passed.`)
        } else {
            console.log(`Player ${_seatNumber}-> played ${_gameModel.convert2ReadableNames(_cardsPlayed).join(",")}.`);
        }
    }
    private ILLEGALCARDS_S2C(data) {
        console.log("Illegal Cards.");
    }
    private GAMEEND_S2C(data) {
        let _winnerSeatNumber = data.seatNumber;

        let _gameModel = this.getGameModel();
        let _isWin = _winnerSeatNumber === _gameModel.seatNumber;
        let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
        console.log(_content);
        _gameModel.resetWhenGameEnd();

        console.log("Press Enter to restart.")
        // this.getInputFromCmd();
        this.startGame();
    }
    private GAMESTART_S2C(data) {
        console.log("Game start.");

        let _gameModel = this.getGameModel();
        _gameModel.seatNumber = data.seatNumber;
    }
    private BROADCAST_MSG_S2C(data) {
        let _msg = data.msg;
        console.log(_msg);
    }
    //=== receive end ===


    //=== send begin ===
    private encodeData(data) {
        let _cmd = data.cmd;
        let _dataBody = data.body;
        let _bytesData;

        let _gameModel = this.getGameModel();
        switch (_cmd) {
            case card_game_pb.Cmd.READY_C2S:
                _bytesData = card_game_pb.ReadyC2S.encode({ seatNumber: _gameModel.seatNumber }).finish();
                break;
            case card_game_pb.Cmd.PLAYCARDS_C2S:
                _bytesData = card_game_pb.PlayCardsC2S.encode({ seatNumber: _dataBody.seatNumber, cards: _dataBody.cards }).finish();
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
                _bytesData = card_game_pb.CompeteForLandLordRoleC2S.encode({ seatNumber: _dataBody.seatNumber, score: _dataBody.score }).finish();
                break;
        }
        if (_bytesData) {
            let _completeData = card_game_pb.MainMessage.encode({
                cmdId: _cmd,
                data: _bytesData
            }).finish();
            return _completeData;
        }
        return null;
    }
    private send(data) {
        let _dataBuffer = this.encodeData(data);
        if (_dataBuffer) Net.ins.write(_dataBuffer);
    }

    private startGame() {
        this.send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
    }
    //=== send end ===
}