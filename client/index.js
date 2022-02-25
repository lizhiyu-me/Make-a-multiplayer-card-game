const net = require('net');
const readlineSync = require('readline-sync');
const { ENUM_CMD_FN } = require('../share/proto');
const { convert2ReadableNames,convert2CardNumbers } = require('../share/helper');

const socket = new net.Socket();
socket.connect({
    host: '127.0.0.1',
    port: 8080
}, onConnected);

socket.on('data', (buffer) => {
    decodeData(buffer);
})
socket.on('error', (buffer) => {
    console.log(buffer);
});

var _this = this;
function decodeData(buffer) {
    const _cmd = buffer.readUInt8();
    const _body = JSON.parse(buffer.slice(1));
    const _funcName = ENUM_CMD_FN[_cmd];
    if (_funcName && typeof _this[_funcName] == "function") _this[_funcName](_body);
}

function onConnected() {
    startGame();
}

function request(data) {
    const bufferData = encodeData(data);
    socket.write(bufferData);
}

function startGame() {
    request({ cmd: ENUM_CMD_FN.ready_C2S, body: null })
}

function encodeData(data) {
    const body = Buffer.from(JSON.stringify(data.body));
    const header = Buffer.alloc(1);
    header.writeUInt8(data.cmd);
    const buffer = Buffer.concat([header, body]);
    return buffer;
}

//====== game logic below ======
let mCardsArr = [];
this.dealCards_S2C = function (data) {
    let _cards = data.cards;
    mCardsArr = sortByValue(_cards);
    let _myHandCardsShowArr = convert2ReadableNames(mCardsArr);
    console.log('Deal cards complete, your seat number is-> ', data.seatNumber, 'your cards->', _myHandCardsShowArr.join(','));
    console.log('Select a score to confirm role (you can input 1|2|3, the one who select the biggest number will be the land lord, and the base score is the selected number.): ');
    const _score = getInputFromCmd();
    this.competeForLandLordRole_C2S(_score);
}
this.playCards_C2S = function () {
    console.log('Now, your turn.');
    console.log('Your cards->', convert2ReadableNames(mCardsArr).join(','));
    console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm):');
    let _cardsNumberStr = convert2CardNumbers(getInputFromCmd().split(",")).join(",");
    request({ cmd: ENUM_CMD_FN.playCards_C2S, body: { 'cards': _cardsNumberStr, 'seatNumber': 0 } });
}
this.playCards_S2C = function (data) {
    let _cardsPlayed = data.cards;
    let _seatNumber = data.seatNumber;
    if (_cardsPlayed.length == 0) {
        console.log(`Player ${_seatNumber}-> passed.`)
    } else {
        console.log(`Player ${_seatNumber}-> played ${convert2ReadableNames(_cardsPlayed).join(",")}.`);
    }
}
this.notAllowedByRule_S2C = function (data) {
    console.log("Cards are not allowed by rule.");
    this.playTurn({ seatNumber: 0});
}
this.gameEnd_S2C = function (data) {
    let _winnerSeatNumber = data.seatNumber;
    let _isWin = _winnerSeatNumber === 0;
    let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
    console.log(_content);

    console.log("Press Enter to restart.")
    getInputFromCmd();
    startGame();
}

this.competeForLandLordRole_C2S = function (score) {
    console.log(`You has called ${score} score`);
    request({ cmd: ENUM_CMD_FN.competeForLandLordRole_C2S, body: { 'score': score, seatNumber: 0 } });
}
this.playTurn = function (data) {
    let _seatNumber = data.seatNumber;
    if (_seatNumber == 0) {
        //update hand cards
        if(data.handCards)mCardsArr = sortByValue(data.handCards);
        this.playCards_C2S();
    }
}

//====== data and custom function bellow ======
function sortByValue(arr) {
    return arr.sort((a, b) => {
        return getCardValue(b) - getCardValue(a);
    })
}

function getInputFromCmd() {
    return readlineSync.question();
}

function getCardValue(cardSerialNumber) {
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
