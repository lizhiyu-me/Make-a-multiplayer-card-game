import * as net from 'net';
import * as  readlineSync from 'readline-sync';
import { RuleChecker } from '../share/rule-checker';
import * as card_game_pb from "../share/proto/card-game";
export default class Server {
    private socketDic: { [playerID: number]: net.Socket } = {};
    private port = 8080;
    private playerCount = 3;
    private mServer = net.createServer();
    constructor() {
        this.selectPlayerCount();

        this.mServer.on("connection", (socket: net.Socket) => {
            let _id_seat = this.generatePlayerIDAndSeatNumber();
            let _playerID = _id_seat.id;
            let _seatNumber = _id_seat.seat;
            socket["id"] = _playerID;
            socket["seat"] = _seatNumber;
            this.socketDic[_playerID] = socket;

            this.addSocketListener(socket);
        })

        this.mServer.listen(this.port, () => {
            console.log(`server listening on 127.0.0.1:${this.port}`)
        });
    }
    private selectPlayerCount() {
        console.log("Please input the player count (2 or 3) to create a server:");
        let _playerCountStr = this.getInputFromCmd();
        let _playerCount = +_playerCountStr;
        if (_playerCount == 2 || _playerCount == 3) {
            this.playerCount = _playerCount;
        } else {
            console.log("Wrong input, please input again.")
            this.selectPlayerCount();
        }
    }

    private addSocketListener(socket: net.Socket) {
        socket.on('data', (data) => {
            let _playerID = socket["id"];
            this.decodeData(data, _playerID);
        });
        socket.on('end', (socket) => {
            console.log("end");
        });
        socket.on('error', (error) => {
            console.log(error);
            console.log("player disconnected unexpectly, game end");
            if (this.mIsGaming) {
                let _seat = socket["seat"];
                this.broadMsg(`Player ${_seat} quit the game, bye.`);
                this.mIsGaming = false;
                process.exit();
            } else {
                let _playerID = socket["id"];
                this.playerDisconnect(_playerID);
            }
        });
    }

    private decodeData(buffer, playerID) {
        let _mainMsg = card_game_pb.MainMessage.decode(buffer);
        let _cmd = _mainMsg.cmdId;
        let _bytesData = _mainMsg.data;
        switch (_cmd) {
            case card_game_pb.Cmd.READY_C2S:
                this.ready_C2S();
                break;
            case card_game_pb.Cmd.PLAYCARDS_C2S:
                this.playCards_C2S(playerID, card_game_pb.PlayCardsC2S.decode(_bytesData));
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
                this.competeForLandLordRole_C2S(playerID, card_game_pb.CompeteForLandLordRoleC2S.decode(_bytesData));
                break;
            default:
                console.log("no message matched.")
        }
    }
    private encodeData(cmd, data) {
        let _cmd = cmd;
        let _bytesData;
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
                console.log("no message matched.")
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
    private send(playerID, cmd, data) {
        if (!this.mIsGaming) return;
        const _dataBuffer = this.encodeData(cmd, data);
        let _socket = this.socketDic[playerID];
        if (_dataBuffer && !_socket.destroyed) _socket.write(_dataBuffer);
    }
    private broadcast(cmd, data) {
        if (!this.mIsGaming) return;
        const _dataBuffer = this.encodeData(cmd, data);
        if (_dataBuffer) {
            let _keyArr = Object.keys(this.socketDic);
            for (let i = 0; i < _keyArr.length; i++) {
                let _socket = this.socketDic[_keyArr[i]];
                if (_socket && !_socket.destroyed) _socket.write(_dataBuffer);
            }
        }
    }

    //====== game logic bellow ======
    private playerCardsDic = {};
    private initialCardCount = 17;
    private lordCardsCount = 3;
    private dealCards_S2C() {
        let _pokerPool = this.shuffleArr(this.POKER_VALUES.slice());
        for (let i = 0; i < this.playerCount; i++) {
            this.playerCardsDic[i] =
                _pokerPool.slice(i * this.initialCardCount, (i + 1) * this.initialCardCount);
        }
        let _lordCards = _pokerPool.slice(-this.lordCardsCount);
        this.playerCardsDic[this.lordRoleSeat] = this.playerCardsDic[this.lordRoleSeat].concat(_lordCards);

        let _keyArr = Object.keys(this.playerCardsDic);
        for (let i = 0; i < _keyArr.length; i++) {
            const _originCards = this.playerCardsDic[_keyArr[i]];
            this.playerCardsDic[_keyArr[i]] = _originCards.map(card => card % 0x10);
        }

        let _countIdx = 0;
        _keyArr = Object.keys(this.socketDic);
        for (let i = 0; i < _keyArr.length; i++) {
            let _socket = this.socketDic[_keyArr[i]];
            let _playerID = _socket.id;
            let _seatNumber = _socket.seat;
            let data = {
                seatNumber: _seatNumber,
                cards: this.playerCardsDic[_countIdx++]
            }
            this.send(_playerID, card_game_pb.Cmd.DEALCARDS_S2C, data);
        }
    }
    private readyPlayerCount = 0;
    private ready_C2S() {
        this.readyPlayerCount++;
        if (this.readyPlayerCount == this.playerCount) {
            this.resetGameRoundData();

            this.mIsGaming = true;
            this.roundStart();
            let _firstCompeteLordPlayerSeatNumber = Math.floor(Math.random() * this.playerCount);
            this.broadcast(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C, { seatNumber: _firstCompeteLordPlayerSeatNumber, curMaxScore: this.maxCalledLordScore })
        }
    }
    private calledCompeteLordScoreArr = [];
    private maxCalledLordScore = 0;
    private lordRoleSeat = 0;
    private lordRolePlayerID = 0;
    private competeForLandLordRole_C2S(playerID, data) {
        let _score = data.score;
        let _seatNumber = data.seatNumber;
        this.broadMsg("Player " + _seatNumber + " called " + _score + " score.");
        this.calledCompeteLordScoreArr.push(_score);

        if (_score > this.maxCalledLordScore) {
            this.maxCalledLordScore = _score;
            this.lordRoleSeat = _seatNumber;
            this.lordRolePlayerID = playerID;
        }
        let _hasCompeteForLordRoleCompleted = this.calledCompeteLordScoreArr.length == this.playerCount || _score == 3;
        if (_hasCompeteForLordRoleCompleted) {
            //broad lord role
            this.broadMsg("Land lord player's seat number is " + this.lordRoleSeat);
            this.dealCards_S2C();
            //turn to lord role player
            this.send(this.lordRolePlayerID, card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: this.lordRoleSeat, handCards: this.playerCardsDic[this.lordRoleSeat] });
        } else {
            let _nextTurnSeat = this.getNextPlayerSeatNumber(_seatNumber);
            // let _nextPlayerID = this.getPlayerIDBySeatNumber(_nextTurnSeat);
            // this.send(_nextPlayerID, card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C, { seatNumber: this.lordRoleSeat, curMaxScore: this.maxCalledLordScore });
            this.broadcast(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C, { seatNumber: _nextTurnSeat, curMaxScore: this.maxCalledLordScore });
        }
    }
    private playCards_C2S(playerID, data) {
        this.checkIsTrickEnd(data.seatNumber);
        let _cardsNumberArr = data.cards;
        let _seatNumber = data.seatNumber;
        let _canPlay = false;
        if (_cardsNumberArr.length == 0) {//pass
            _canPlay = true;
            this.playCards_S2C({ cards: [], seatNumber: _seatNumber });
            this.preCardsArr = [];
            this.preCardsType = -1;
            this.prePlayerSeat = _seatNumber;
        } else {
            //check has cards
            if (!this.checkHasCards(_cardsNumberArr, _seatNumber)) {
                console.log("no cards to play");
                this.send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
                return;
            }
            let _curCardsType = -1;
            if (this.preCardsType === -1) {
                let _res = Object.keys(RuleChecker.CheckCardType(_cardsNumberArr, -1));
                if (_res.length != 0) {
                    _curCardsType = ~~_res[0];
                    _canPlay = true;
                }
            } else {
                let _res = RuleChecker.CheckCard(_cardsNumberArr, this.preCardsArr, this.preCardsType);
                if (_res['isOK']) {
                    _curCardsType = ~~_res.cardsType[0];
                    _canPlay = true;
                }
            }
            if (_canPlay) {
                this.preCardsArr = _cardsNumberArr;
                this.preCardsType = _curCardsType;
                this.prePlayerSeat = _seatNumber;
                this.playCards_S2C({ cards: this.preCardsArr, seatNumber: _seatNumber });
            } else {
                console.log("Illegal cards");
                this.send(playerID, card_game_pb.Cmd.ILLEGALCARDS_S2C, {});
            }
        }
        if (_canPlay && this.playerCardsDic[_seatNumber].length != 0 && this.mIsGaming){
            setTimeout(() => {
                let _nextTurnSeatNumber = this.getNextPlayerSeatNumber(_seatNumber);
                this.broadcast(card_game_pb.Cmd.PLAYTURN_S2C, { seatNumber: _nextTurnSeatNumber, handCards: this.playerCardsDic[_nextTurnSeatNumber] });
            }, 500);
        } 
    }
    private playCards_S2C(data) {
        this.removePlayerCards(data.cards, data.seatNumber);
        this.broadcast(card_game_pb.Cmd.PLAYCARDS_S2C, data);
    }
    //====== data and custom function bellow ======
    private preCardsArr = [];
    private preCardsType = -1;
    private prePlayerSeat = -1;
    private isTrickEnd = true;
    private checkIsTrickEnd(seat) {
        this.isTrickEnd = this.prePlayerSeat === seat;
        if (this.isTrickEnd) {
            this.preCardsArr.length = 0;
            this.preCardsType = -1;
        }
    }
    private removePlayerCards(playedCards, seatNumber) {
        let _handCardsArr = this.playerCardsDic[seatNumber];
        for (let i = 0; i < playedCards.length; i++) {
            let item = playedCards[i];
            let _idx = _handCardsArr.indexOf(item);
            _handCardsArr.splice(_idx, 1);
        }
        if (_handCardsArr.length === 0) {
            this.broadcast(card_game_pb.Cmd.GAMEEND_S2C, { seatNumber: seatNumber });
            this.resetGameRoundData();
        }
        return _handCardsArr;
    }
    private checkHasCards(cardsNumberArr, seatNumber) {
        let _handCardsArr = this.playerCardsDic[seatNumber].slice();
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
    private mIsGaming = false;
    private resetGameRoundData() {
        this.mIsGaming = false;
        this.preCardsArr.length = 0;
        this.preCardsType = -1;
        this.isTrickEnd = true;
        this.readyPlayerCount = 0;
        this.playerIDArr.length = 0;
        this.calledCompeteLordScoreArr.length = 0;
        this.maxCalledLordScore = 0;
        this.lordRoleSeat = 0;
        this.lordRolePlayerID = 0;
    }
    private getNextPlayerSeatNumber(preSeatNumber) {
        let _cur = preSeatNumber + 1;
        if (_cur >= this.playerCount) {
            _cur = _cur - this.playerCount;
        }
        return _cur;
    }

    private playerIDArr = [];
    private generatePlayerIDAndSeatNumber() {
        let _seat = this.playerIDArr.length;
        let _id = Math.floor(Math.random() * 10000);
        let _isExist = this.playerIDArr.indexOf(_id) != -1;
        if (_isExist) {
            this.generatePlayerIDAndSeatNumber();
        } else {
            this.playerIDArr.push(_id);
        }
        return { id: _id, seat: _seat };
    }

    private roundStart() {
        //broad players info {seatNumber,playerID}
        let _keyArr = Object.keys(this.socketDic);
        for (let i = 0; i < _keyArr.length; i++) {
            let _socket = this.socketDic[_keyArr[i]];
            let _playerID = _socket.id;
            let _seatNumber = _socket.seat;
            let _data = { "playerId": _playerID, "seatNumber": _seatNumber };
            this.send(_playerID, card_game_pb.Cmd.GAMESTART_S2C, _data);
        }
    }

    /* private getPlayerIDBySeatNumber(seatNumber) {
        let _keyArr = Object.keys(this.socketDic);
        for (let i = 0; i < _keyArr.length; i++) {
            let _socket = this.socketDic[_keyArr[i]];
            let _seatNumber = _socket.seat;
            if (seatNumber == _seatNumber) return _socket.id;
        }
        return null;
    } */

    private broadMsg(msgStr) {
        this.broadcast(card_game_pb.Cmd.BROADCAST_MSG_S2C, { "msg": msgStr });
    }

    private getInputFromCmd() {
        return readlineSync.question();
    }

    private playerDisconnect(playerID) {
        this.readyPlayerCount--;
        this.playerIDArr.splice(this.playerIDArr.indexOf(playerID), 1);
        delete this.socketDic[playerID];
    }

    private shuffleArr(input) {
        for (var i = input.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    private POKER_VALUES = [
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,	//diamond A - K
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,	//club A - K
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,	//heart A - K
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,	//spade A - K
        0x4E, 0x4F, //bJkr,rJkr
    ];
}

new Server();