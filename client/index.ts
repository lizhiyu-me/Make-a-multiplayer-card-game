import * as net from 'net';
import * as readlineSync from 'readline-sync';
import { convert2ReadableNames, convert2CardNumbers, cardNameNumberDic } from '../share/helper';
import * as card_game_pb from "../share/proto/card-game";
export default class Client {
    private _welcomeImage = `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,/%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#,%%%%%%%%%%%%%..%.............%%%%.*%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(.%%%%%%%%%%.....(%%%(%%%/%%%%%%%%..%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%%%%%%%%%%%..%%..%%%%%%%.,%%%%%..%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.(%%%%%%%........%%%%%%%.,%%%%%..%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%,/%%%%%%%%..%%%&%%/.%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**@@@@@@@@@@%,%%%%%%%%..%%%%%/...&%%%%%%%%..%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&.,/,/&@@@@@@@@#,%%%%%...(% ../%%%%%,...%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@#,&%%%%%%%#..*%&&,(%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@(,%%##############...,%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@@.&%#################%%%%..*/%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@/*&%%##########################,..(%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@@@@@@@@@@*/%%%%%#########################%%%%(.,%%%%%%%%%%%%%%%
@@@@@@@@@@@@,%@@@@@@@@@@@@.#%##%#%####/,.,#/**,,%%########%%%%%%&&@,,%%%%%%%%%%%
@@@@@@@@@@@@@.%@@@@@@@@@@@,&%###%%%&#.&@%......,&.@&&%%%%%%%%%%&&&@@..%%%%%%%%%%
@@@..@@@@@@@@@,@@@@@@@@@@@,&&%%%%%&&,@@,........*/,@@@@@@@@@@&&&@@(,@,,%%%%%%%%%
@@@@..@@@@@@@@,@@@@@@@@@@@.@@&&&&&@@.%@%......,.@&*@@@@@@@@@@@@#,*&@*#%%%%%%%%%%
@@@@@.*@@@@@@@.#@@@@@@@@@@.(@@@@@@@@@/,(@@#%&@@@*,@@@@@@@@@&@@@@@@.*%%%%%%%%%%%%
@@@@@&.@@@@@@@&,@@@@@@@@@@@,@@@@@@@@@@@@@(,,,,*@@@@@@@@@@@@@@@(,,%%%%%%%%%%%%%%%
@@@@@@,(@@@@@@@,%@@@@@@@@@@,%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,,*%%%%%%%%%%%%%%%%%%
@@@@@@@.@@@@@@@#*@@@@@@@@@@@,#@@@@@@@@@@@@@@@@@@@@@@@@,*,#%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@.@@@@@@@&,&@@@@@@@@@@&,@@@@@@@@@@@@@@@@@@%,/@%%%%%%%%%%%%%%%%%%%%%%%%%%%
.@@@@@@@@.@@@@@@@@*,@@@@@@@@@@@./@@@@@@@@@@@@*./%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/.@@@@@@@@,,@@@@@@@@,#@@@@@@@@@@&*@@@@/,,,*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
@@,.@@@@@@@&.*@@@@@@@#./@@@@@@@@@//@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*//(.*@@@@@@.*.(@@@@.*%*,*(@&/../%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%&%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
`;
    private ip = "127.0.0.1";
    private port = 8080;
    private mSocket = new net.Socket();
    constructor() {
        console.log(this._welcomeImage + "\n" + "Welcome to Fish Poker(摸鱼斗地主)");
        // this.joinServer();
        let _this = this;
        this.mSocket.connect({
            host: this.ip,
            port: this.port
        },_this.onConnected.bind(_this));

        this.mSocket.on('connect', (buffer) => {
            console.log("Server connected, waiting for other player join...");
        })
        this.mSocket.on('data', (buffer) => {
            _this.decodeData(buffer);
        })
        this.mSocket.on('error', (buffer) => {
            console.log(buffer);
        });
    }
    private joinServer() {
        //input ip and port
        console.log("Please input the ip and port you want to connect (e.g. 192.168.0.1:8080):")
        let _ip_port = this.getInputFromCmd();
        var _ip_port_reg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        if (!_ip_port_reg.test(_ip_port)) {
            console.log("Wrong format, please input again.")
            this.joinServer();
        } else {
            let _splited = _ip_port.split(":");
            this.ip = _splited[0];
            this.port = +_splited[1];
        }
    }

    private decodeData(buffer) {
        let _mainMsg: card_game_pb.MainMessage = card_game_pb.MainMessage.decode(buffer);
        let _cmd = _mainMsg.cmdId;
        let _bytesData = _mainMsg.data;
        switch (_cmd) {
            case card_game_pb.Cmd.DEALCARDS_S2C:
                this.dealCards_S2C(card_game_pb.DealCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYCARDS_S2C:
                this.playCards_S2C(card_game_pb.PlayCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.ILLEGALCARDS_S2C:
                this.illegalCards_S2C(card_game_pb.IllegalCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMEEND_S2C:
                this.gameEnd_S2C(card_game_pb.GameEndS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYTURN_S2C:
                this.playTurn_S2C(card_game_pb.PlayTurnS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMESTART_S2C:
                this.gameStart_S2C(card_game_pb.GameStartS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C:
                this.competeForLandLordRole_S2C(card_game_pb.CompeteForLandLordRoleS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.BROADCAST_MSG_S2C:
                this.broadCastMsg_S2C(card_game_pb.BroadCastMsgS2C.decode(_bytesData));
                break;
            default:
                console.log("no message matched.")
        }
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
        let _curMaxScore = data.curMaxScore;
        let _scoreCanBeSelectedStr = "123".slice(_curMaxScore).split("").join("|");
        console.log(`Select a score to confirm role (you can input ${_scoreCanBeSelectedStr}, the one who select the biggest number will be the land lord, and the base score is the selected number.): `);
        const _score = this.getInputFromCmd();
        this.competeForLandLordRole_C2S(_score);
    }
    private playCards_C2S() {
        console.log('Now, your turn.');
        console.log('Your cards->', convert2ReadableNames(this.mCardsArr).join(','));
        console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
        let _inputContent = this.getInputFromCmd();
        if (_inputContent == "" || this.checkIsCardsLegal(_inputContent)) {
            let _cardsNumberArr = _inputContent == "" ? [] : convert2CardNumbers(_inputContent.split(","));
            this.send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: _cardsNumberArr, seatNumber: this.seatNumber } });
        } else {
            console.log("Illegal cards, please select your cards again.")
            this.playTurn({ seatNumber: this.seatNumber });
        }
    }
    private playCards_S2C(data) {
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
        this.getInputFromCmd();
        this.startGame();
    }

    private competeForLandLordRole_C2S(score) {
        console.log(`You has called ${score} score`);
        this.send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: score, seatNumber: this.seatNumber } });
    }
    private playTurn_S2C(data) {
        let _seatNumber = data.seatNumber;
        if (_seatNumber == this.seatNumber) {
            //update hand cards
            if (data.handCards) this.mCardsArr = this.sortByValue(data.handCards);
            this.playCards_C2S();
        }
    }
    private gameStart_S2C(data) {
        let _seatNumber = data.seatNumber;
        let _playerID = data.playerId;

        this.seatNumber = _seatNumber;
        this.playerID = _playerID;
    }
    private broadCastMsg_S2C(data) {
        let _msg = data.msg;
        console.log(_msg);
    }

    //====== data and custom private bellow ======
    private seatNumber;
    private playerID;
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
    private getInputFromCmd() {
        return readlineSync.question();
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
        this.playerID = null;
    }
}

new Client();