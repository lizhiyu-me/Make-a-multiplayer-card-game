"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var net = __importStar(require("net"));
var readlineSync = __importStar(require("readline-sync"));
var helper_1 = require("../share/helper");
var card_game_pb = __importStar(require("../share/proto/card-game"));
var Client = /** @class */ (function () {
    function Client() {
        this._welcomeImage = "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,/%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#,%%%%%%%%%%%%%..%.............%%%%.*%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(.%%%%%%%%%%.....(%%%(%%%/%%%%%%%%..%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%%%%%%%%%%%..%%..%%%%%%%.,%%%%%..%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.(%%%%%%%........%%%%%%%.,%%%%%..%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%,/%%%%%%%%..%%%&%%/.%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**@@@@@@@@@@%,%%%%%%%%..%%%%%/...&%%%%%%%%..%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&.,/,/&@@@@@@@@#,%%%%%...(% ../%%%%%,...%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@#,&%%%%%%%#..*%&&,(%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@(,%%##############...,%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@@.&%#################%%%%..*/%%%%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@/*&%%##########################,..(%%%%%%%%%%%%%%%%%%%\n@@@@@@@@@@@@@@@@@@@@@@@@@@*/%%%%%#########################%%%%(.,%%%%%%%%%%%%%%%\n@@@@@@@@@@@@,%@@@@@@@@@@@@.#%##%#%####/,.,#/**,,%%########%%%%%%&&@,,%%%%%%%%%%%\n@@@@@@@@@@@@@.%@@@@@@@@@@@,&%###%%%&#.&@%......,&.@&&%%%%%%%%%%&&&@@..%%%%%%%%%%\n@@@..@@@@@@@@@,@@@@@@@@@@@,&&%%%%%&&,@@,........*/,@@@@@@@@@@&&&@@(,@,,%%%%%%%%%\n@@@@..@@@@@@@@,@@@@@@@@@@@.@@&&&&&@@.%@%......,.@&*@@@@@@@@@@@@#,*&@*#%%%%%%%%%%\n@@@@@.*@@@@@@@.#@@@@@@@@@@.(@@@@@@@@@/,(@@#%&@@@*,@@@@@@@@@&@@@@@@.*%%%%%%%%%%%%\n@@@@@&.@@@@@@@&,@@@@@@@@@@@,@@@@@@@@@@@@@(,,,,*@@@@@@@@@@@@@@@(,,%%%%%%%%%%%%%%%\n@@@@@@,(@@@@@@@,%@@@@@@@@@@,%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,,*%%%%%%%%%%%%%%%%%%\n@@@@@@@.@@@@@@@#*@@@@@@@@@@@,#@@@@@@@@@@@@@@@@@@@@@@@@,*,#%%%%%%%%%%%%%%%%%%%%%%\n@@@@@@@@.@@@@@@@&,&@@@@@@@@@@&,@@@@@@@@@@@@@@@@@@%,/@%%%%%%%%%%%%%%%%%%%%%%%%%%%\n.@@@@@@@@.@@@@@@@@*,@@@@@@@@@@@./@@@@@@@@@@@@*./%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n/.@@@@@@@@,,@@@@@@@@,#@@@@@@@@@@&*@@@@/,,,*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n@@,.@@@@@@@&.*@@@@@@@#./@@@@@@@@@//@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n/*//(.*@@@@@@.*.(@@@@.*%*,*(@&/../%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%&%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n";
        this.ip = "127.0.0.1";
        this.port = 8080;
        this.mSocket = new net.Socket();
        //====== game logic below ======
        this.mCardsArr = [];
        console.log(this._welcomeImage + "\n" + "Welcome to Fish Poker(摸鱼斗地主)");
        // this.joinServer();
        var _this = this;
        this.mSocket.connect({
            host: this.ip,
            port: this.port
        }, _this.onConnected.bind(_this));
        this.mSocket.on('connect', function (buffer) {
            console.log("Server connected, waiting for other player join...");
        });
        this.mSocket.on('data', function (buffer) {
            _this.decodeData(buffer);
        });
        this.mSocket.on('error', function (buffer) {
            console.log(buffer);
        });
    }
    Client.prototype.joinServer = function () {
        //input ip and port
        console.log("Please input the ip and port you want to connect (e.g. 192.168.0.1:8080):");
        var _ip_port = this.getInputFromCmd();
        var _ip_port_reg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        if (!_ip_port_reg.test(_ip_port)) {
            console.log("Wrong format, please input again.");
            this.joinServer();
        }
        else {
            var _splited = _ip_port.split(":");
            this.ip = _splited[0];
            this.port = +_splited[1];
        }
    };
    Client.prototype.decodeData = function (buffer) {
        var _mainMsg = card_game_pb.MainMessage.decode(buffer);
        var _cmd = _mainMsg.cmdId;
        var _bytesData = _mainMsg.data;
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
                console.log("no message matched.");
        }
    };
    Client.prototype.onConnected = function () {
        this.startGame();
    };
    Client.prototype.encodeData = function (data) {
        var _cmd = data.cmd;
        var _dataBody = data.body;
        var _bytesData;
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
            var _completeData = card_game_pb.MainMessage.encode({
                cmdId: _cmd,
                data: _bytesData
            }).finish();
            return _completeData;
        }
        return null;
    };
    Client.prototype.send = function (data) {
        var _dataBuffer = this.encodeData(data);
        if (_dataBuffer)
            this.mSocket.write(_dataBuffer);
    };
    Client.prototype.dealCards_S2C = function (data) {
        var _cards = data.cards;
        this.mCardsArr = this.sortByValue(_cards);
        var _myHandCardsShowArr = (0, helper_1.convert2ReadableNames)(this.mCardsArr);
        console.log('Deal cards complete, your seat number is-> ', data.seatNumber, 'your cards->', _myHandCardsShowArr.join(','));
    };
    Client.prototype.competeForLandLordRole_S2C = function (data) {
        var _curMaxScore = data.curMaxScore;
        var _scoreCanBeSelectedStr = "123".slice(_curMaxScore).split("").join("|");
        console.log("Select a score to confirm role (you can input " + _scoreCanBeSelectedStr + ", the one who select the biggest number will be the land lord, and the base score is the selected number.): ");
        var _score = this.getInputFromCmd();
        this.competeForLandLordRole_C2S(_score);
    };
    Client.prototype.playCards_C2S = function () {
        console.log('Now, your turn.');
        console.log('Your cards->', (0, helper_1.convert2ReadableNames)(this.mCardsArr).join(','));
        console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
        var _inputContent = this.getInputFromCmd();
        if (_inputContent == "" || this.checkIsCardsLegal(_inputContent)) {
            var _cardsNumberArr = _inputContent == "" ? [] : (0, helper_1.convert2CardNumbers)(_inputContent.split(","));
            this.send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: _cardsNumberArr, seatNumber: this.seatNumber } });
        }
        else {
            console.log("Illegal cards, please select your cards again.");
            this.playTurn({ seatNumber: this.seatNumber });
        }
    };
    Client.prototype.playCards_S2C = function (data) {
        var _cardsPlayed = data.cards;
        var _seatNumber = data.seatNumber;
        if (_cardsPlayed.length == 0) {
            console.log("Player " + _seatNumber + "-> passed.");
        }
        else {
            console.log("Player " + _seatNumber + "-> played " + (0, helper_1.convert2ReadableNames)(_cardsPlayed).join(",") + ".");
        }
    };
    Client.prototype.illegalCards_S2C = function (data) {
        console.log("Illegal Cards.");
        this.playTurn({ seatNumber: this.seatNumber });
    };
    Client.prototype.gameEnd_S2C = function (data) {
        var _winnerSeatNumber = data.seatNumber;
        var _isWin = _winnerSeatNumber === this.seatNumber;
        var _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
        console.log(_content);
        this.resetWhenGameEnd();
        console.log("Press Enter to restart.");
        this.getInputFromCmd();
        this.startGame();
    };
    Client.prototype.competeForLandLordRole_C2S = function (score) {
        console.log("You has called " + score + " score");
        this.send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: score, seatNumber: this.seatNumber } });
    };
    Client.prototype.playTurn_S2C = function (data) {
        var _seatNumber = data.seatNumber;
        if (_seatNumber == this.seatNumber) {
            //update hand cards
            if (data.handCards)
                this.mCardsArr = this.sortByValue(data.handCards);
            this.playCards_C2S();
        }
    };
    Client.prototype.gameStart_S2C = function (data) {
        var _seatNumber = data.seatNumber;
        var _playerID = data.playerId;
        this.seatNumber = _seatNumber;
        this.playerID = _playerID;
    };
    Client.prototype.broadCastMsg_S2C = function (data) {
        var _msg = data.msg;
        console.log(_msg);
    };
    Client.prototype.startGame = function () {
        this.send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
    };
    Client.prototype.playTurn = function (data) {
        this.playTurn_S2C(data);
    };
    Client.prototype.sortByValue = function (arr) {
        var _this_1 = this;
        return arr.sort(function (a, b) {
            return _this_1.getCardValue(b) - _this_1.getCardValue(a);
        });
    };
    Client.prototype.getInputFromCmd = function () {
        return readlineSync.question();
    };
    Client.prototype.getCardValue = function (cardSerialNumber) {
        var _cardNumber;
        var _cardNumberWithoutSuit = cardSerialNumber % 0x10;
        if (_cardNumberWithoutSuit == 0x0e) {
            _cardNumber = 0x10;
        }
        else if (_cardNumberWithoutSuit == 0x0f) {
            _cardNumber = 0x11;
        }
        else if (_cardNumberWithoutSuit == 0x01) {
            _cardNumber = 0x0e;
        }
        else if (_cardNumberWithoutSuit == 0x02) {
            _cardNumber = 0x0f;
        }
        else {
            _cardNumber = _cardNumberWithoutSuit;
        }
        return _cardNumber;
    };
    Client.prototype.checkIsCardsLegal = function (cardsNumberStr) {
        var _cardsNumberStrArr = cardsNumberStr.split(",");
        for (var i = 0; i < _cardsNumberStrArr.length; i++) {
            var _cardNumberStr = _cardsNumberStrArr[i];
            if (!helper_1.cardNameNumberDic[_cardNumberStr])
                return false;
        }
        return true;
    };
    Client.prototype.resetWhenGameEnd = function () {
        this.seatNumber = null;
        this.playerID = null;
    };
    return Client;
}());
exports.default = Client;
new Client();
//# sourceMappingURL=index.js.map