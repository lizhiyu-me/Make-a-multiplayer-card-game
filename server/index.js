const net = require('net');
const { ENUM_CMD_FN } = require('../share/proto');

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

server.listen(8080, () => {
    console.log("server listening on 127.0.0.1:8080")
});

//============= game logic bellow ===============
var playerCardsDic = {};
var playerCount = 3;
var initialCardCount = 17;
this.dealCards_S2C = function () {
    let _pokerPool = POKER_VALUES.slice().shuffle();
    for (let i = 0; i < playerCount; i++) {
        playerCardsDic[i] = _pokerPool.slice(i * initialCardCount, (i + 1) * initialCardCount);
    }
    _lordCards = _pokerPool.slice(initialCardCount * playerCount);
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

this.competeForLandLordRole_C2S = function(data){
    let _score = data.score;
    send(ENUM_CMD_FN.playTurn,{serverSeat:0});
}
//============== data and custom function bellow ==============
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

const POKER_VALUES =
    [
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,	//diamond A - K
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,	//club A - K
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,	//heart A - K
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,	//spade A - K
        0x4E, 0x4F, //bJkr,rJkr
    ];

