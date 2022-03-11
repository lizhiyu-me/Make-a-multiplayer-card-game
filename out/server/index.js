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
var rule_checker_1 = require("../share/rule-checker");
var card_game_pb = __importStar(require("../share/proto/card-game"));
var socketDic = {};
var port = 8080;
var playerCount = 3;
function selecetPlayerCount() {
    console.log(this);
    console.log("Please input the player count (2 or 3) to create a server:");
    var _playerCountStr = getInputFromCmd();
    var _playerCount = +_playerCountStr;
    if (_playerCount == 2 || _playerCount == 3) {
        playerCount = _playerCount;
    }
    else {
        console.log("Wrong input, please input again.");
        selecetPlayerCount();
    }
}
selecetPlayerCount();
var server = net.createServer();
server.on("connection", function (socket) {
    var _id_seat = generatePlayerIDAndSeatNumber();
    var _playerID = _id_seat.id;
    var _seatNumber = _id_seat.seat;
    socket["id"] = _playerID;
    socket["seat"] = _seatNumber;
    socketDic[_playerID] = socket;
    addSocketListener(socket);
});
function addSocketListener(socket) {
    socket.on('data', function (data) {
        var _playerID = socket.id;
        decodeData(data, _playerID);
    });
    socket.on('end', function (socket) {
    });
    socket.on('error', function (error) {
        //player disconnect
        console.log(error);
    });
}
server.listen(port, function () {
    console.log("server listening on 127.0.0.1:" + port);
});
function decodeData(buffer, playerID) {
    var _mainMsg = card_game_pb.MainMessage.decode(buffer);
    var _cmd = _mainMsg.cmdId;
    var _bytesData = _mainMsg.data;
    switch (_cmd) {
        case card_game_pb.Cmd.READY_C2S:
            ready_C2S();
            break;
        case card_game_pb.Cmd.PLAYCARDS_C2S:
            playCards_C2S(playerID, card_game_pb.PlayCardsC2S.decode(_bytesData));
            break;
        case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
            competeForLandLordRole_C2S(playerID, card_game_pb.CompeteForLandLordRoleC2S.decode(_bytesData));
            break;
        default:
            console.log("no message matched.");
    }
}
function encodeData(cmd, data) {
    var _cmd = cmd;
    var _bytesData;
    switch (_cmd) {
        case card_game_pb.Cmd.DEALCARDS_S2C:
            _bytesData = card_game_pb.DealCardsS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.PLAYCARDS_S2C:
            _bytesData = card_game_pb.PlayCardsS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.ILLEGALCARDS_S2C:
            _bytesData = card_game_pb.IllegalCardsS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.GAMEEND_S2C:
            _bytesData = card_game_pb.GameEndS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.PLAYTURN_S2C:
            _bytesData = card_game_pb.PlayTurnS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.GAMESTART_S2C:
            _bytesData = card_game_pb.GameStartS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C:
            _bytesData = card_game_pb.CompeteForLandLordRoleS2C.encode(data).finish();
            break;
        case card_game_pb.Cmd.BROADCAST_MSG_S2C:
            _bytesData = card_game_pb.BroadCastMsgS2C.encode(data).finish();
            break;
        default:
            console.log("no message matched.");
    }
    if (_bytesData) {
        var _completeData = card_game_pb.MainMessage.encode({
            cmdId: _cmd,
            data: _bytesData
        }).finish();
        return _completeData;
    }
    return null;
}
function send(playerID, cmd, data) {
    if (!mIsGaming)
        return;
    var _dataBuffer = encodeData(cmd, data);
    if (_dataBuffer)
        socketDic[playerID].write(_dataBuffer);
}
function broadcast(cmd, data) {
    if (!mIsGaming)
        return;
    var _dataBuffer = encodeData(cmd, data);
    if (_dataBuffer) {
        var _keyArr = Object.keys(socketDic);
        for (var i = 0; i < _keyArr.length; i++) {
            var _socket = socketDic[_keyArr[i]];
            _socket.write(_dataBuffer);
        }
    }
}
//====== game logic bellow ======
var playerCardsDic = {};
var initialCardCount = 17;
var lordCardsCount = 3;
function dealCards_S2C() {
    var _pokerPool = shuffleArr(POKER_VALUES.slice());
    for (var i = 0; i < playerCount; i++) {
        playerCardsDic[i] =
            _pokerPool.slice(i * initialCardCount, (i + 1) * initialCardCount);
    }
    var _lordCards = _pokerPool.slice(-lordCardsCount);
    playerCardsDic[lordRoleSeat] = playerCardsDic[lordRoleSeat].concat(_lordCards);
    var _keyArr = Object.keys(playerCardsDic);
    for (var i = 0; i < _keyArr.length; i++) {
        var _originCards = playerCardsDic[_keyArr[i]];
        playerCardsDic[_keyArr[i]] = _originCards.map(function (card) { return card % 0x10; });
    }
    var _countIdx = 0;
    _keyArr = Object.keys(socketDic);
    for (var i = 0; i < _keyArr.length; i++) {
        var _socket = socketDic[_keyArr[i]];
        var _playerID = _socket.id;
        var _seatNumber = _socket.seat;
        var data = {
            seatNumber: _seatNumber,
            cards: playerCardsDic[_countIdx++]
        };
        send(_playerID, card_game_pb.Cmd.DEALCARDS_S2C, data);
    }
}
var readyPlayerCount = 0;
function ready_C2S() {
    readyPlayerCount++;
    if (readyPlayerCount == playerCount) {
        resetGameRoundData();
        mIsGaming = true;
        roundStart();
        var _firstCompeteLordPlayerSeatNumber = Math.floor(Math.random() * playerCount);
        var _playerID = getPlayerIDBySeatNumber(_firstCompeteLordPlayerSeatNumber);
        send(_playerID, card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C, { seatNumber: _firstCompeteLordPlayerSeatNumber, curMaxScore: maxCalledLordScore });
    }
}
var calledCompeteLordScoreArr = [];
var maxCalledLordScore = 0;
var lordRoleSeat = 0;
var lordRolePlayerID = 0;
function competeForLandLordRole_C2S(playerID, data) {
    var _score = data.score;
    var _seatNumber = data.seatNumber;
    broadMsg("Player " + _seatNumber + " called " + _score + " score.");
    calledCompeteLordScoreArr.push(_score);
    if (_score > maxCalledLordScore) {
        maxCalledLordScore = _score;
        lordRoleSeat = _seatNumber;
        lordRolePlayerID = playerID;
    }
    var _hasCompeteForLordRoleCompleted = calledCompeteLordScoreArr.length == playerCount || _score == 3;
    if (_hasCompeteForLordRoleCompleted) {
        //broad lord role
        broadMsg("Land lord player's seat number is " + lordRoleSeat);
        dealCards_S2C();
        //turn to lord role player
        send(lordRolePlayerID, card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: lordRoleSeat, handCards: playerCardsDic[lordRoleSeat] });
    }
    else {
        var _nextTurnSeat = getNextPlayerSeatNumber(_seatNumber);
        var _nextPlayerID = getPlayerIDBySeatNumber(_nextTurnSeat);
        send(_nextPlayerID, card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C, { seatNumber: lordRoleSeat, curMaxScore: maxCalledLordScore });
    }
}
function playCards_C2S(playerID, data) {
    checkIsTrickEnd(data.seatNumber);
    var _cardsNumberArr = data.cards;
    var _seatNumber = data.seatNumber;
    var _canPlay = false;
    if (_cardsNumberArr.length == 0) { //pass
        _canPlay = true;
        playCards_S2C({ cards: [], seatNumber: _seatNumber });
        preCardsArr = [];
        preCardsType = -1;
        prePlayerSeat = _seatNumber;
    }
    else {
        //check has cards
        if (!checkHasCards(_cardsNumberArr, _seatNumber)) {
            console.log("no cards to play");
            send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
            return;
        }
        var _curCardsType = -1;
        if (preCardsType === -1) {
            var _res = Object.keys(rule_checker_1.RuleChecker.CheckCardType(_cardsNumberArr, -1));
            if (_res.length != 0) {
                _curCardsType = ~~_res[0];
                _canPlay = true;
            }
        }
        else {
            var _res = rule_checker_1.RuleChecker.CheckCard(_cardsNumberArr, preCardsArr, preCardsType);
            if (_res['isOK']) {
                _curCardsType = ~~_res.cardsType[0];
                _canPlay = true;
            }
        }
        if (_canPlay) {
            preCardsArr = _cardsNumberArr;
            preCardsType = _curCardsType;
            prePlayerSeat = _seatNumber;
            playCards_S2C({ cards: preCardsArr, seatNumber: _seatNumber });
        }
        else {
            console.log("Illegal cards");
            send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
        }
    }
    if (_canPlay && playerCardsDic[_seatNumber].length != 0)
        setTimeout(function () {
            var _nextTurnSeatNumber = getNextPlayerSeatNumber(_seatNumber);
            var _nextTurnPlayerID = getPlayerIDBySeatNumber(_nextTurnSeatNumber);
            send(_nextTurnPlayerID, card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: _nextTurnSeatNumber, handCards: playerCardsDic[_nextTurnSeatNumber] });
        }, 500);
}
function playCards_S2C(data) {
    removePlayerCards(data.cards, data.seatNumber);
    broadcast(card_game_pb.Cmd.PLAYCARDS_S2C, data);
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
    var _handCardsArr = playerCardsDic[seatNumber];
    for (var i = 0; i < playedCards.length; i++) {
        var item = playedCards[i];
        var _idx = _handCardsArr.indexOf(item);
        _handCardsArr.splice(_idx, 1);
    }
    if (_handCardsArr.length === 0) {
        broadcast(card_game_pb.Cmd.GAMEEND_S2C, { seatNumber: seatNumber });
        resetGameRoundData();
    }
    return _handCardsArr;
}
function checkHasCards(cardsNumberArr, seatNumber) {
    var _handCardsArr = playerCardsDic[seatNumber].slice();
    var _res = true;
    for (var i = 0; i < cardsNumberArr.length; i++) {
        var item = cardsNumberArr[i];
        var _idx = _handCardsArr.indexOf(item);
        if (_idx != -1) {
            _handCardsArr.splice(_idx, 1);
        }
        else {
            _res = false;
        }
    }
    return _res;
}
var mIsGaming = false;
function resetGameRoundData() {
    mIsGaming = false;
    preCardsArr.length = 0;
    preCardsType = -1;
    isTrickEnd = true;
    readyPlayerCount = 0;
    playerIDArr.length = 0;
    calledCompeteLordScoreArr.length = 0;
    maxCalledLordScore = 0;
    lordRoleSeat = 0;
    lordRolePlayerID = 0;
}
function getNextPlayerSeatNumber(preSeatNumber) {
    var _cur = preSeatNumber + 1;
    if (_cur >= playerCount) {
        _cur = _cur - playerCount;
    }
    return _cur;
}
var playerIDArr = [];
function generatePlayerIDAndSeatNumber() {
    var _seat = playerIDArr.length;
    var _id = Math.floor(Math.random() * 10000);
    var _isExist = playerIDArr.indexOf(_id) != -1;
    if (_isExist) {
        generatePlayerIDAndSeatNumber();
    }
    else {
        playerIDArr.push(_id);
    }
    return { id: _id, seat: _seat };
}
function roundStart() {
    //broad players info {seatNumber,playerID}
    var _keyArr = Object.keys(socketDic);
    for (var i = 0; i < _keyArr.length; i++) {
        var _socket = socketDic[_keyArr[i]];
        var _playerID = _socket.id;
        var _seatNumber = _socket.seat;
        var _data = { "playerID": _playerID, "seatNumber": _seatNumber };
        send(_playerID, card_game_pb.Cmd.GAMESTART_S2C, _data);
    }
}
function getPlayerIDBySeatNumber(seatNumber) {
    var _keyArr = Object.keys(socketDic);
    for (var i = 0; i < _keyArr.length; i++) {
        var _socket = socketDic[_keyArr[i]];
        var _seatNumber = _socket.seat;
        if (seatNumber == _seatNumber)
            return _socket.id;
    }
    return null;
}
function broadMsg(msgStr) {
    broadcast(card_game_pb.Cmd.BROADCAST_MSG_S2C, { "msg": msgStr });
}
function getInputFromCmd() {
    return readlineSync.question();
}
function shuffleArr(input) {
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
var POKER_VALUES = [
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,
    0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,
    0x4E, 0x4F, //bJkr,rJkr
];
//# sourceMappingURL=index.js.map