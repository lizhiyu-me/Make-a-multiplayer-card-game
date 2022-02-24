const net = require('net');
const { ENUM_CMD_FN } = require('../share/proto');
const { RuleChecker} = require('../share/rule-checker');
var mSocket;
const server = net.createServer((socket) => {
    mSocket = socket;
    mSocket.on('data', (data) => {
        decodeData(data)
    });
});
var _this = this;
function decodeData(data) {
    let _cmd = data.readUInt8();
    let _body = JSON.parse(data.slice(1));
    const _funcName = ENUM_CMD_FN[_cmd];
    if (_funcName && typeof _this[_funcName] == "function") _this[_funcName](_body);
}
function send(cmd, data) {
    let _header = Buffer.alloc(1);
    _header.writeUInt8(cmd);
    let _body = Buffer.from(JSON.stringify(data));
    const dataBuffer = Buffer.concat([_header, _body]);
    mSocket.write(dataBuffer);
}
var port = 8080;
server.listen(port, () => {
    console.log(`server listening on 127.0.0.1:${port}`)
});

//====== game logic bellow ======
var playerCardsDic = {};
var playerCount = 2;
var initialCardCount = 17;
var lordCardsCount = 3;
this.dealCards_S2C = function () {
    let _pokerPool = POKER_VALUES.slice().shuffle();
    for (let i = 0; i < playerCount; i++) {
        playerCardsDic[i] = _pokerPool.slice(i * initialCardCount, (i + 1) * initialCardCount);
    }
    _lordCards = _pokerPool.slice(-lordCardsCount);
    //In single player mode, set the player landlord default.
    playerCardsDic[0] = playerCardsDic[0].concat(_lordCards);
    let data = {
        serverSeat: 0,
        cards: playerCardsDic[0]
    }
    send(ENUM_CMD_FN.dealCards_S2C, data);
}
this.ready_C2S = function () {
    this.dealCards_S2C();
}
this.competeForLandLordRole_C2S = function (data) {
    let _score = data.score;
    send(ENUM_CMD_FN.playTurn, { serverSeat: 0 });
}
this.playCards_C2S = function (data) {
    checkIsTrickEnd(0);
    let _cardsStr = data.cards;
    if (_cardsStr === "") {//pass
        this.playCards_S2C({ cards: "", seatNumber: 0 });
        setTimeout(botPlayCards, 500, ...[preCardsArr, 1]);
    } else {
        let _cardsArr = _cardsStr.split(',').map(i => ~~i);
        let _isCanPut = false;
        let _curCardsType = -1;
        if (preCardsType === -1) {
            let _res = Object.keys(RuleChecker.CheckCardType(_cardsArr, -1));
            if (_res.length != 0) {
                _curCardsType = ~~_res[0];
                _isCanPut = true;
            }
        } else {
            let _res = RuleChecker.CheckCard(_cardsArr, preCardsArr, preCardsType);
            if (_res['isOK']) {
                _isCanPut = true;
                _curCardsType = ~~_res.cardsType[0];
            }
        }
        if (_isCanPut) {
            preCardsArr = _cardsArr.map(i => ~~i);
            preCardsType = _curCardsType;
            prePlayerSeat = 0;
            let _curHandCards = removePlayerCards(preCardsArr, 0);
            this.playCards_S2C({ cards: preCardsArr, seatNumber: 0, handCards: _curHandCards });
            setTimeout(botPlayCards, 500, ...[preCardsArr, 1]);
        } else {
            send(ENUM_CMD_FN.playNotAllowRule_S2C, null);
        }
    }
}
this.playCards_S2C = function (data) {
    send(ENUM_CMD_FN.playCards_S2C, data);
}
//====== data and custom function bellow ======
var preCardsArr = [];
var preCardsType = -1;
var prePlayerSeat = -1;
var isTrickEnd = true;
function checkIsTrickEnd(seat) {
    isTrickEnd = prePlayerSeat === seat;
    if (isTrickEnd) {
        preCardsArr.length = 0;
        preCardsType = -1;
    }
}
function removePlayerCards(playedCards, seatNumber) {
    let _handCardsArr = playerCardsDic[seatNumber];
    for (let i = 0; i < playedCards.length; i++) {
        let item = playedCards[i];
        let _idx = _handCardsArr.indexOf(item);
        if (_idx != -1) {
            _handCardsArr.splice(_idx, 1);
        }
    }
    if (_handCardsArr.length === 0) {
        send(ENUM_CMD_FN.gameEnd_S2C, { seatNumber: seatNumber });
        resetWhenGameEnd();
    }
    return _handCardsArr;
}
function resetWhenGameEnd() {
    preCardsArr.length = 0;
    preCardsType = -1;
    isTrickEnd = true;
}
function botPlayCards(_preCardsArr, seatNumber) {
    checkIsTrickEnd(seatNumber);
    let _botCards = playerCardsDic[seatNumber];
    let _botPlayCards;
    if (preCardsType === -1) {
        _botPlayCards = _botCards[0];
        preCardsArr = _botPlayCards;
        send({ cards: [preCardsArr], seatNo: seatNumber, handCards: [] }, -1, 4, socket);
    } else {
        _botPlayCards = RuleChecker.HelpCard(_botCards, _preCardsArr, preCardsType);
        if (_botPlayCards.length != 0) {
            preCardsArr = _botPlayCards;
            preCardsType = ~~Object.keys(RuleChecker.CheckCardType(_botPlayCards, -1))[0];
            prePlayerSeat = seatNumber;
            this.playCards_S2C({ cards: preCardsArr, seatNumber: seatNumber });
        } else {
            this.playCards_S2C({ cards: "", seatNumber: seatNumber });
        }
    }
    setTimeout(botPlayCards, 500, ...[preCardsArr, ++seatNumber]);
}
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
const POKER_VALUES = [
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,	//diamond A - K
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,	//club A - K
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,	//heart A - K
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,	//spade A - K
    0x4E, 0x4F, //bJkr,rJkr
];

