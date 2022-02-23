const net = require('net');
const readlineSync = require('readline-sync');
const { ENUM_CMD_FN } = require('../share/proto');

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
function decodeData (buffer) {
    const _cmd = buffer.readInt16BE();
    const _body = JSON.parse(buffer.slice(2));
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
    const header = Buffer.alloc(2);
    header.writeUInt16BE(data.cmd);
    const buffer = Buffer.concat([header, body]);
    return buffer;
}

//============== game process function below ==================
let mCardsArr = [];
this.dealCards_S2C = function (data) {
    let _cards = data.cards;
    mCardsArr = sortByValue(_cards);
    myHandCardsShowArr = convert2ReadableNames(mCardsArr);
    console.log('Deal cards complete, your seat number is-> ', data.serverSeat, 'your cards->', myHandCardsShowArr.join(','));
    console.log('Select a score to confirm role (you can input 1|2|3, the one who select the biggest number will be the land lord, and the base score is the selected number.): ');
    const _score = getInputFromCmd();
    console.log(`${_score} score`);
    request({ cmd: ENUM_CMD_FN.competeForLandLordRole_C2S, data: { 'score': _score } });
}
this.playCards_S2C = function (data) {
    let _cardsPlayed = data.cards;
    let _seatNumber = data.seatNumber;
    if (_cardsPlayed == "") {
        console.log(`Player ${_seatNumber}-> passed.`)
    } else {
        console.log(`Player ${_seatNumber}-> played ${_seatNumber}.`)
    }
}
this.playNotAllowRule_S2C = function () {
    console.log("Cards are not allowed.")
}
this.gameEnd_S2C = function (data) {
    let _winnerSeatNumber = data.seatNumber;
    let _isWin = _winnerSeatNumber === 0;
    let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
    console.log(_content);
}

this.competeForLandLordRole_C2S = function () {

}
this.playCards_C2S = function () {
    console.log('Now, your turn.');
    console.log('Your cards->', mCardsArr.join(','));
    console.log('Please input your cards to play (join with ",", press Enter to confirm):');
    let _cards = convert2CardNumbers(getInputFromCmd());
    request({ cmd: ENUM_CMD_FN.playCards_C2S, data: { 'cards': _cards, 'seatNumber': 0 } });
}

//=============== define custom function below ==================
/**
 * * rJkr for redJoker
 * * bJkr for blackJoker
 */
var cardNameNumberDic = {
    'rJkr': 0x0e,
    'bJkr': 0x0f,
    'A': 0x01,
    'K': 0x0d,
    'Q': 0x0c,
    'J': 0x0b,
    '10': 0x0a,
    '9': 0x09,
    '8': 0x08,
    '7': 0x07,
    '6': 0x06,
    '5': 0x05,
    '4': 0x04,
    '3': 0x03,
    '2': 0x02
}
/**
 * * rJkr for redJoker
 * * bJkr for blackJoker
 */
var cardNumberNameDic = {
    0x0e: 'rJkr',
    0x0f: 'bJkr',
    0x01: 'A',
    0x0d: 'K',
    0x0c: 'Q',
    0x0b: 'J',
    0x0a: '10',
    0x09: '9',
    0x08: '8',
    0x07: '7',
    0x06: '6',
    0x05: '5',
    0x04: '4',
    0x03: '3',
    0x02: '2'
}
function getCardReadableName(cardNumber) {
    let _cardNumber = Number(cardNumber);
    let _value = _cardNumber % 0x10;
    return cardNumberNameDic[_value];
}

function convert2ReadableNames(cardsArr) {
    let _res = [];
    for (let i = 0, len = cardsArr.length; i < len; i++) {
        let _cardNumber = cardsArr[i];
        _res.push(getCardReadableName(_cardNumber));
    }
    return _res;
}
function convert2CardNumbers(cardNames) {
    let _res = [];
    for (let i = 0, len = cardNames.length; i < len; i++) {
        let _cardName = cardNames[i];
        _res.push(cardNameNumberDic[_cardName]);
    }
    return _res;
}

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
