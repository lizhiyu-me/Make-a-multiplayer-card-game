import { ip, port } from './config/globalConfig';
import { convert2ReadableNames, convert2CardNumbers, cardNameNumberDic } from '../share/helper';
import * as card_game_pb from "../share/proto/card-game";

export default class Client {
    private ip = ip;
    private port = port;
    private mSocket;
    constructor() {
        // this.createSocket(this.ip, this.port);
    }

    private onConnected() {
        this.startGame();
    }
    private encodeData(data) {
        let _cmd = data.cmd;
        let _dataBody = data.body;
        let _bytesData;
        switch (_cmd) {
            case card_game_pb.Cmd.READY_C2S:
                _bytesData = card_game_pb.ReadyC2S.encode({ seatNumber: this.seatNumber }).finish();
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
        if (_dataBuffer) this.mSocket.write(_dataBuffer);
    }
    //====== game logic below ======
    private mCardsArr = [];
    private dealCards_S2C(data) {
        let _cards = data.cards;
        this.mCardsArr = this.sortByValue(_cards);
        let _myHandCardsShowArr = convert2ReadableNames(this.mCardsArr);
        console.log('Deal cards complete, your seat number is-> ', data.seatNumber, 'your cards->', _myHandCardsShowArr.join(','));
    }
    private competeForLandLordRole_S2C(data) {
        this.stopWaiting();
        let _curMaxScore = data.curMaxScore;
        let _seatNumber = data.seatNumber;
        if (_seatNumber == this.seatNumber) {
            let _scoreCanBeSelectedStr = "123".slice(_curMaxScore).split("").join("|");
            console.log(`Select a score to confirm role (you can input ${_scoreCanBeSelectedStr}, the one who select the biggest number will be the land lord, and the base score is the selected number.): `);
            // const _score = this.getInputFromCmd();
            // this.competeForLandLordRole_C2S(_score);
        } else {
            this.showWaiting(`Player ${_seatNumber} is calling score for land lord role`);
        }
    }
    private playCards_C2S() {
        console.log('Now, your turn.');
        console.log('Your cards->', convert2ReadableNames(this.mCardsArr).join(','));
        console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
        /* let _inputContent = this.getInputFromCmd();
        if (_inputContent == "" || this.checkIsCardsLegal(_inputContent)) {
            let _cardsNumberArr = _inputContent == "" ? [] : convert2CardNumbers(_inputContent.split(","));
            this.send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: _cardsNumberArr, seatNumber: this.seatNumber } });
        } else {
            console.log("Illegal cards, please select your cards again.")
            this.playTurn({ seatNumber: this.seatNumber });
        } */
    }
    private playCards_S2C(data) {
        this.stopWaiting();
        let _cardsPlayed = data.cards;
        let _seatNumber = data.seatNumber;
        if (_cardsPlayed.length == 0) {
            console.log(`Player ${_seatNumber}-> passed.`)
        } else {
            console.log(`Player ${_seatNumber}-> played ${convert2ReadableNames(_cardsPlayed).join(",")}.`);
        }
    }
    private illegalCards_S2C(data) {
        console.log("Illegal Cards.");
        this.playTurn({ seatNumber: this.seatNumber });
    }
    private gameEnd_S2C(data) {
        let _winnerSeatNumber = data.seatNumber;
        let _isWin = _winnerSeatNumber === this.seatNumber;
        let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
        console.log(_content);
        this.resetWhenGameEnd();

        console.log("Press Enter to restart.")
        // this.getInputFromCmd();
        this.startGame();
    }

    private competeForLandLordRole_C2S(score) {
        console.log(`You has called ${score} score`);
        this.send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: score, seatNumber: this.seatNumber } });
    }
    private playTurn_S2C(data) {
        this.stopWaiting();
        let _seatNumber = data.seatNumber;
        if (_seatNumber == this.seatNumber) {
            //update hand cards
            if (data.handCards) this.mCardsArr = this.sortByValue(data.handCards);
            this.playCards_C2S();
        } else {
            this.showWaiting(`Player ${_seatNumber} is considering`);
        }
    }
    private gameStart_S2C(data) {
        console.log("Game start.");
        this.seatNumber = data.seatNumber;
        // this.playerID = data.playerId;
    }
    private broadCastMsg_S2C(data) {
        let _msg = data.msg;
        console.log(_msg);
    }

    //====== data and custom private bellow ======
    private seatNumber;
    // private playerID;
    private startGame() {
        this.send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
    }
    private playTurn(data) {
        this.playTurn_S2C(data);
    }
    private sortByValue(arr) {
        return arr.sort((a, b) => {
            return this.getCardValue(b) - this.getCardValue(a);
        })
    }
    private getCardValue(cardSerialNumber) {
        let _cardNumber;
        let _cardNumberWithoutSuit = cardSerialNumber % 0x10;
        if (_cardNumberWithoutSuit == 0x0e) {
            _cardNumber = 0x10;
        } else if (_cardNumberWithoutSuit == 0x0f) {
            _cardNumber = 0x11;
        } else if (_cardNumberWithoutSuit == 0x01) {
            _cardNumber = 0x0e;
        } else if (_cardNumberWithoutSuit == 0x02) {
            _cardNumber = 0x0f;
        } else {
            _cardNumber = _cardNumberWithoutSuit;
        }
        return _cardNumber;
    }
    private checkIsCardsLegal(cardsNumberStr) {
        let _cardsNumberStrArr = cardsNumberStr.split(",");
        for (let i = 0; i < _cardsNumberStrArr.length; i++) {
            const _cardNumberStr = _cardsNumberStrArr[i];
            if (!cardNameNumberDic[_cardNumberStr]) return false;
        }
        return true;
    }

    private resetWhenGameEnd() {
        this.seatNumber = null;
        // this.playerID = null;
    }

    // private mIsShowWaiting: boolean = false;
    private showWaiting(contentStr: string) {
        // this.mIsShowWaiting = true;
        // this.consoleLogDotDotDotAnimationWith(contentStr);
    }
    private stopWaiting() {
        // this.mIsShowWaiting = false;
    }
    /* private mLogTimeout: NodeJS.Timeout;
    private consoleLogDotDotDotAnimationWith(contentStr: string) {
        var a = [".", "..", "..."];
        var step = 0;
        let _this = this;
        function show() {
            clearTimeout(_this.mLogTimeout);
            if (!_this.mIsShowWaiting) {
                log_single_line.clear();
                return;
            }
            if (step >= a.length) step = 0;
            log_single_line(contentStr + a[step] + "\n");
            step++;
            _this.mLogTimeout = setTimeout(() => {
                show();
            }, 400)
        }
        show();
    } */
}

new Client();