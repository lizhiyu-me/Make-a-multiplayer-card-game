const net = require('net');
const readlineSync = require('readline-sync');
const { convert2ReadableNames, convert2CardNumbers, cardNameNumberDic } = require('../share/helper');
const card_game_pb = require("../share/proto/out/card-game_pb");
var mSocket = new net.Socket();
var port = 8080;
mSocket.connect({
    host: '127.0.0.1',
    port: port
}, onConnected);

mSocket.on('data', (buffer) => {
    decodeData(buffer);
})
mSocket.on('error', (buffer) => {
    console.log(buffer);
});

var _this = this;
function decodeData(buffer) {
    let _mainMsg = card_game_pb.MainMessage.deserializeBinary(buffer);
    let _cmd = _mainMsg.getCmdId();
    let _bytesData = _mainMsg.getData();
    let _data;
    switch (_cmd) {
        case card_game_pb.Cmd.DEALCARDS_S2C:
            _data = card_game_pb.DealCards_S2C.deserializeBinary(_bytesData);
            _data = {
                cards: _data.getCardsList(),
                seatNumber: _data.getSeatNumber()
            }
            if (_this.dealCards_S2C) _this.dealCards_S2C(_data);
            break;
        case card_game_pb.Cmd.PLAYCARDS_S2C:
            _data = card_game_pb.PlayCards_S2C.deserializeBinary(_bytesData);
            _data = {
                cards: _data.getCardsList(),
                seatNumber: _data.getSeatNumber()
            }
            if (_this.playCards_S2C) _this.playCards_S2C(_data);
            break;
        case card_game_pb.Cmd.ILLEGALCARDS_S2C:
            _data = card_game_pb.IllegalCards_S2C.deserializeBinary(_bytesData);
            _data = {
                seatNumber: _data.getSeatNumber()
            }
            if (_this.illegalCards_S2C) _this.illegalCards_S2C(_data);
            break;
        case card_game_pb.Cmd.GAMEEND_S2C:
            _data = card_game_pb.GameEnd_S2C.deserializeBinary(_bytesData);
            _data = {
                seatNumber: _data.getSeatNumber()
            }
            if (_this.gameEnd_S2C) _this.gameEnd_S2C(_data);
            break;
        case card_game_pb.Cmd.PLAYTURN_S2C:
            _data = card_game_pb.PlayTurn_S2C.deserializeBinary(_bytesData);
            _data = {
                handCards: _data.getHandCardsList(),
                seatNumber: _data.getSeatNumber()
            }
            if (_this.playTurn_S2C) _this.playTurn_S2C(_data);
            break;
        default:
            console.log("no message matched.")
    }
}
function onConnected() {
    startGame();
}
function encodeData(data) {
    let _cmd = data.cmd;
    let _dataBody = data.body;
    let _proto_struct_obj;
    switch (_cmd) {
        case card_game_pb.Cmd.READY_C2S:
            _proto_struct_obj = new card_game_pb.Ready_C2S();
            _proto_struct_obj.setSeatNumber(0);
            break;
        case card_game_pb.Cmd.PLAYCARDS_C2S:
            _proto_struct_obj = new card_game_pb.PlayCards_C2S();
            _proto_struct_obj.setSeatNumber(_dataBody.seatNumber);
            _proto_struct_obj.setCardsList(_dataBody.cards);
            break;
        case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
            _proto_struct_obj = new card_game_pb.CompeteForLandLordRole_C2S();
            _proto_struct_obj.setSeatNumber(_dataBody.seatNumber);
            _proto_struct_obj.setScore(_dataBody.score);
            break;
    }
    if (_proto_struct_obj) {
        let _mainMsg = new card_game_pb.MainMessage();
        _mainMsg.setCmdId(_cmd);
        let _data = _proto_struct_obj.serializeBinary();
        _mainMsg.setData(_data);
        let _completeData = _mainMsg.serializeBinary();
        return _completeData;
    }
    return null;
}
function send(data) {
    let _dataBuffer = encodeData(data);
    if (_dataBuffer) mSocket.write(_dataBuffer);
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
    console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
    let _inputContent = getInputFromCmd();
    if (_inputContent == "" || checkIsCardsLegal(_inputContent)) {
        let _cardsNumberArr = _inputContent == "" ? [] : convert2CardNumbers(_inputContent.split(","));
        send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { 'cards': _cardsNumberArr, 'seatNumber': 0 } });
    } else {
        console.log("Illegal cards, please select your cards again.")
        playTurn({ seatNumber: 0 });
    }
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
this.illegalCards_S2C = function (data) {
    console.log("Illegal Cards.");
    playTurn({ seatNumber: 0 });
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
    send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: score, seatNumber: 0 } });
}
this.playTurn_S2C = function (data) {
    let _seatNumber = data.seatNumber;
    if (_seatNumber == 0) {
        //update hand cards
        if (data.handCards) mCardsArr = sortByValue(data.handCards);
        this.playCards_C2S();
    }
}

//====== data and custom function bellow ======
function startGame() {
    send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
}
function playTurn(data) {
    _this.playTurn_S2C(data);
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
function checkIsCardsLegal(cardsNumberStr) {
    let _cardsNumberStrArr = cardsNumberStr.split(",");
    for (let i = 0; i < _cardsNumberStrArr.length; i++) {
        const _cardNumberStr = _cardsNumberStrArr[i];
        if (!cardNameNumberDic[_cardNumberStr]) return false;
    }
    return true;
}
