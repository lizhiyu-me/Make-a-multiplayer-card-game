const net = require('net');
const { RuleChecker } = require('../share/rule-checker');
const card_game_pb = require("../share/proto/out/card-game_pb");
var socketDic = {};
var port = 8080;
const server = net.createServer();
server.on("connection", (socket) => {
    let _id_seat = generatePlayerIDAndSeatNumber();
    let _playerID = _id_seat.id;
    let _seatNumber = _id_seat.seat;
    socket.id = _playerID;
    socket.seat = _seatNumber;
    socketDic[_playerID] = socket;

    addSocketListener(socket);
})

function addSocketListener(socket) {
    socket.on('data', (data) => {
        let _playerID = socket.id;
        decodeData(data, _playerID);
    });
    socket.on('end', (socket) => {
    });
    socket.on('error', (error) => {
        //player disconnect
        console.log(error);
    });
}
server.listen(port, () => {
    console.log(`server listening on 127.0.0.1:${port}`)
});
var _this = this;
function decodeData(buffer, playerID) {
    let _mainMsg = card_game_pb.MainMessage.deserializeBinary(buffer);
    let _cmd = _mainMsg.getCmdId();
    let _bytesData = _mainMsg.getData();
    let _data;
    switch (_cmd) {
        case card_game_pb.Cmd.READY_C2S:
            _data = card_game_pb.Ready_C2S.deserializeBinary(_bytesData);
            _data = {
                seatNumber: _data.getSeatNumber()
            }
            if (_this.ready_C2S) _this.ready_C2S(_data);
            break;
        case card_game_pb.Cmd.PLAYCARDS_C2S:
            _data = card_game_pb.PlayCards_C2S.deserializeBinary(_bytesData);
            _data = {
                cards: _data.getCardsList(),
                seatNumber: _data.getSeatNumber()
            }
            if (_this.playCards_C2S) _this.playCards_C2S(playerID, _data);
            break;
        case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
            _data = card_game_pb.CompeteForLandLordRole_C2S.deserializeBinary(_bytesData);
            _data = {
                score: _data.getScore(),
                seatNumber: _data.getSeatNumber()
            }
            if (_this.competeForLandLordRole_C2S) _this.competeForLandLordRole_C2S(playerID, _data);
            break;
        default:
            console.log("no message matched.")
    }
}
function encodeData(cmd, data) {
    let _cmd = cmd;
    let _proto_struct_obj;
    switch (_cmd) {
        case card_game_pb.Cmd.DEALCARDS_S2C:
            _proto_struct_obj = new card_game_pb.DealCards_S2C();
            _proto_struct_obj.setCardsList(data.cards);
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        case card_game_pb.Cmd.PLAYCARDS_S2C:
            _proto_struct_obj = new card_game_pb.PlayCards_S2C();
            _proto_struct_obj.setCardsList(data.cards);
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        case card_game_pb.Cmd.ILLEGALCARDS_S2C:
            _proto_struct_obj = new card_game_pb.IllegalCards_S2C();
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        case card_game_pb.Cmd.GAMEEND_S2C:
            _proto_struct_obj = new card_game_pb.GameEnd_S2C();
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        case card_game_pb.Cmd.PLAYTURN_S2C:
            _proto_struct_obj = new card_game_pb.PlayTurn_S2C();
            _proto_struct_obj.setHandCardsList(data.handCards);
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        case card_game_pb.Cmd.GAMESTART_S2C:
            _proto_struct_obj = new card_game_pb.GameStart_S2C();
            _proto_struct_obj.setPlayerId(data.playerID);
            _proto_struct_obj.setSeatNumber(data.seatNumber);
            break;
        default:
            console.log("no message matched.")
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
function send(playerID, cmd, data) {
    if (!mIsGaming) return;
    const _dataBuffer = encodeData(cmd, data);
    if (_dataBuffer) socketDic[playerID].write(_dataBuffer);
}
function broadcast(cmd, data) {
    if (!mIsGaming) return;
    const _dataBuffer = encodeData(cmd, data);

    if (_dataBuffer) {
        let _keyArr = Object.keys(socketDic);
        for (let i = 0; i < _keyArr.length; i++) {
            let _socket = socketDic[_keyArr[i]];
            // for (const _socket of socketDic) {
            _socket.write(_dataBuffer);
            // }
        }
    }
}

//====== game logic bellow ======
var playerCardsDic = {};
var playerCount = 3;
var initialCardCount = 17;
var lordCardsCount = 3;
this.dealCards_S2C = function () {
    let _pokerPool = POKER_VALUES.slice().shuffle();
    for (let i = 0; i < playerCount; i++) {
        playerCardsDic[i] =
            _pokerPool.slice(i * initialCardCount, (i + 1) * initialCardCount);
    }
    _lordCards = _pokerPool.slice(-lordCardsCount);
    //TODO: lord cards should assign to the player who call the biggest score. 
    playerCardsDic[0] = playerCardsDic[0].concat(_lordCards);

    let _keyArr = Object.keys(playerCardsDic);
    for (let i = 0; i < _keyArr.length; i++) {
        const _originCards = playerCardsDic[_keyArr[i]];
        playerCardsDic[_keyArr[i]] = _originCards.map(card => card % 0x10);
    }

    let _countIdx = 0;
    _keyArr = Object.keys(socketDic);
    for (let i = 0; i < _keyArr.length; i++) {
        let _socket = socketDic[_keyArr[i]];
        let _playerID = _socket.id;
        let _seatNumber = _socket.seat;
        let data = {
            seatNumber: _seatNumber,
            cards: playerCardsDic[_countIdx++]
        }
        send(_playerID, card_game_pb.Cmd.DEALCARDS_S2C, data);
    }
}
var readyPlayerCount = 0;
this.ready_C2S = function () {
    readyPlayerCount++;
    if (readyPlayerCount == playerCount) {
        mIsGaming = true;
        roundStart();
        this.dealCards_S2C();
    }
}
this.competeForLandLordRole_C2S = function (playerID, data) {
    let _score = data.score;
    let _seatNumber = data.seatNumber;
    send(playerID, card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: _seatNumber, handCards: playerCardsDic[_seatNumber] });
}
this.playCards_C2S = function (playerID, data) {
    checkIsTrickEnd(data.seatNumber);
    let _cardsNumberArr = data.cards;
    let _seatNumber = data.seatNumber;
    let _canPlay = false;
    if (_cardsNumberArr.length == 0) {//pass
        _canPlay = true;
        _this.playCards_S2C(playerID,{ cards: [], seatNumber: _seatNumber });
        preCardsArr = [];
        preCardsType = -1;
        prePlayerSeat = _seatNumber;
    } else {
        //check has cards
        if (!checkHasCards(_cardsNumberArr, _seatNumber)) {
            console.log("no cards to play");
            send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
            return;
        }
        let _curCardsType = -1;
        if (preCardsType === -1) {
            let _res = Object.keys(RuleChecker.CheckCardType(_cardsNumberArr, -1));
            if (_res.length != 0) {
                _curCardsType = ~~_res[0];
                _canPlay = true;
            }
        } else {
            let _res = RuleChecker.CheckCard(_cardsNumberArr, preCardsArr, preCardsType);
            if (_res['isOK']) {
                _canPlay = true;
                _curCardsType = ~~_res.cardsType[0];
            }
        }
        if (_canPlay) {
            preCardsArr = _cardsNumberArr;
            preCardsType = _curCardsType;
            prePlayerSeat = _seatNumber;
            _this.playCards_S2C(playerID, { cards: preCardsArr, seatNumber: _seatNumber });
        } else {
            console.log("can not play these cards");
            send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
        }
    }
    // if (_canPlay && playerCardsDic[_seatNumber].length != 0) setTimeout(botPlayCards, 500, ...[preCardsArr, getNextPlayerSeatNumber(_seatNumber)]);
    if (_canPlay && playerCardsDic[_seatNumber].length != 0) setTimeout(() => {
        let _turnSeatNumber = getNextPlayerSeatNumber(_seatNumber);
        let _tuenPlayerID = getPlayerIDBySeatNumber(_turnSeatNumber);
        send(_tuenPlayerID, card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: _turnSeatNumber, handCards: playerCardsDic[_turnSeatNumber] });
    }, 500);
}
this.playCards_S2C = function (playerID, data) {
    removePlayerCards(playerID, data.cards, data.seatNumber);
    broadcast(card_game_pb.Cmd.PLAYCARDS_S2C, data);
    // send(playerID, card_game_pb.Cmd.PLAYCARDS_S2C, data);
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
function removePlayerCards(playerID, playedCards, seatNumber) {
    let _handCardsArr = playerCardsDic[seatNumber];
    for (let i = 0; i < playedCards.length; i++) {
        let item = playedCards[i];
        let _idx = _handCardsArr.indexOf(item);
        _handCardsArr.splice(_idx, 1);
    }
    if (_handCardsArr.length === 0) {
        send(playerID, card_game_pb.Cmd.GAMEEND_S2C, { seatNumber: seatNumber });
        resetWhenGameEnd();
    }
    return _handCardsArr;
}
function checkHasCards(cardsNumberArr, seatNumber) {
    let _handCardsArr = playerCardsDic[seatNumber].slice();
    let _res = true;
    for (let i = 0; i < cardsNumberArr.length; i++) {
        let item = cardsNumberArr[i];
        let _idx = _handCardsArr.indexOf(item);
        if (_idx != -1) {
            _handCardsArr.splice(_idx, 1);
        } else {
            _res = false;
        }
    }
    return _res;
}
var mIsGaming = false;
function resetWhenGameEnd() {
    mIsGaming = false;
    preCardsArr.length = 0;
    preCardsType = -1;
    isTrickEnd = true;
    readyPlayerCount = 0;
    playerIDArr.length = 0;
}
/* function botPlayCards(_preCardsArr, seatNumber) {
    checkIsTrickEnd(seatNumber);
    let _botCards = playerCardsDic[seatNumber];
    let _botPlayCardArr;
    if (preCardsType === -1) {
        _botPlayCardArr = [_botCards[0]];
        preCardsArr = _botPlayCardArr;
        preCardsType = 1;
        _this.playCards_S2C({ cards: preCardsArr, seatNumber: seatNumber });
    } else {
        _botPlayCardArr = RuleChecker.HelpCard(_botCards, _preCardsArr, preCardsType);
        if (_botPlayCardArr.length != 0) {
            preCardsArr = _botPlayCardArr;
            preCardsType = ~~Object.keys(RuleChecker.CheckCardType(_botPlayCardArr, -1))[0];
            prePlayerSeat = seatNumber;
            _this.playCards_S2C({ cards: preCardsArr, seatNumber: seatNumber });
        } else {
            _this.playCards_S2C({ cards: [], seatNumber: seatNumber });
        }
    }
    setTimeout(() => {
        let _turnSeatNumber = getNextPlayerSeatNumber(seatNumber);
        if (_turnSeatNumber == 0) send(card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: _turnSeatNumber, handCards: playerCardsDic[_turnSeatNumber] });
        else {
            botPlayCards(preCardsArr, _turnSeatNumber);
        }
    }, 500);
} */
function getNextPlayerSeatNumber(preSeatNumber) {
    let _cur = preSeatNumber + 1;
    if (_cur >= playerCount) {
        _cur = _cur - playerCount;
    }
    return _cur;
}

var playerIDArr = [];
function generatePlayerIDAndSeatNumber() {
    let _seat = playerIDArr.length;
    let _id = Math.floor(Math.random() * 10000);
    let _isExist = playerIDArr.indexOf(_id) != -1;
    if (_isExist) {
        getPlayerID();
    } else {
        playerIDArr.push(_id);
    }
    return { id: _id, seat: _seat };
}

function roundStart() {
    //broad players info {seatNumber,playerID}
    let _keyArr = Object.keys(socketDic);
    for (let i = 0; i < _keyArr.length; i++) {
        let _socket = socketDic[_keyArr[i]];
        let _playerID = _socket.id;
        let _seatNumber = _socket.seat;
        let _data = { "playerID": _playerID, "seatNumber": _seatNumber };
        send(_playerID, card_game_pb.Cmd.GAMESTART_S2C, _data);
    }
}

function getPlayerIDBySeatNumber(seatNumber) {
    let _keyArr = Object.keys(socketDic);
    for (let i = 0; i < _keyArr.length; i++) {
        let _socket = socketDic[_keyArr[i]];
        let _seatNumber = _socket.seat;
        if (seatNumber == _seatNumber) return _socket.id;
    }
    return null;
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

