import * as net from 'net';
import * as readlineSync from 'readline-sync';
import { convert2ReadableNames, convert2CardNumbers, cardNameNumberDic } from '../share/helper';
import * as card_game_pb from "../share/proto/card-game";

let _welcomeImage = `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
console.log(_welcomeImage + "\n" + "Welcome to Fish Poker(摸鱼斗地主)");

var ip = "127.0.0.1";
var port = 8080;
function joinServer() {
    //input ip and port
    console.log("Please input the ip and port you want to connect (e.g. 192.168.0.1:8080):")
    let _ip_port = getInputFromCmd();
    var _ip_port_reg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    if (!_ip_port_reg.test(_ip_port)) {
        console.log("Wrong format, please input again.")
        joinServer();
    } else {
        let _splited = _ip_port.split(":");
        ip = _splited[0];
        port = +_splited[1];
    }
}
joinServer();
var mSocket = new net.Socket();
mSocket.connect({
    host: ip,
    port: port
}, onConnected);

mSocket.on('connect', (buffer) => {
    console.log("Server connected, waiting for other player join...");
})
mSocket.on('data', (buffer) => {
    decodeData(buffer);
})
mSocket.on('error', (buffer) => {
    console.log(buffer);
});

function decodeData(buffer) {
    let _mainMsg: card_game_pb.MainMessage = card_game_pb.MainMessage.decode(buffer);
    let _cmd = _mainMsg.cmdId;
    let _bytesData = _mainMsg.data;
    switch (_cmd) {
        case card_game_pb.Cmd.DEALCARDS_S2C:
            dealCards_S2C(card_game_pb.DealCardsS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.PLAYCARDS_S2C:
            playCards_S2C(card_game_pb.PlayCardsS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.ILLEGALCARDS_S2C:
            illegalCards_S2C(card_game_pb.IllegalCardsS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.GAMEEND_S2C:
            gameEnd_S2C(card_game_pb.GameEndS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.PLAYTURN_S2C:
            playTurn_S2C(card_game_pb.PlayTurnS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.GAMESTART_S2C:
            gameStart_S2C(card_game_pb.GameStartS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C:
            competeForLandLordRole_S2C(card_game_pb.CompeteForLandLordRoleS2C.decode(_bytesData));
            break;
        case card_game_pb.Cmd.BROADCAST_MSG_S2C:
            broadCastMsg_S2C(card_game_pb.BroadCastMsgS2C.decode(_bytesData));
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
    let _bytesData;
    switch (_cmd) {
        case card_game_pb.Cmd.READY_C2S:
            _bytesData = card_game_pb.ReadyC2S.encode({ seatNumber: seatNumber }).finish();
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
function send(data) {
    let _dataBuffer = encodeData(data);
    if (_dataBuffer) mSocket.write(_dataBuffer);
}
//====== game logic below ======
let mCardsArr = [];
function dealCards_S2C(data) {
    let _cards = data.cards;
    mCardsArr = sortByValue(_cards);
    let _myHandCardsShowArr = convert2ReadableNames(mCardsArr);
    console.log('Deal cards complete, your seat number is-> ', data.seatNumber, 'your cards->', _myHandCardsShowArr.join(','));
}
function competeForLandLordRole_S2C(data) {
    let _curMaxScore = data.curMaxScore;
    let _scoreCanBeSelectedStr = "123".slice(_curMaxScore).split("").join("|");
    console.log(`Select a score to confirm role (you can input ${_scoreCanBeSelectedStr}, the one who select the biggest number will be the land lord, and the base score is the selected number.): `);
    const _score = getInputFromCmd();
    competeForLandLordRole_C2S(_score);
}
function playCards_C2S() {
    console.log('Now, your turn.');
    console.log('Your cards->', convert2ReadableNames(mCardsArr).join(','));
    console.log('Please input your cards to play (join with ",", e.g."A,A,A,6", press "Enter" to confirm your input, input nothing to pass this turn):');
    let _inputContent = getInputFromCmd();
    if (_inputContent == "" || checkIsCardsLegal(_inputContent)) {
        let _cardsNumberArr = _inputContent == "" ? [] : convert2CardNumbers(_inputContent.split(","));
        send({ cmd: card_game_pb.Cmd.PLAYCARDS_C2S, body: { cards: _cardsNumberArr, seatNumber: seatNumber } });
    } else {
        console.log("Illegal cards, please select your cards again.")
        playTurn({ seatNumber: seatNumber });
    }
}
function playCards_S2C(data) {
    let _cardsPlayed = data.cards;
    let _seatNumber = data.seatNumber;
    if (_cardsPlayed.length == 0) {
        console.log(`Player ${_seatNumber}-> passed.`)
    } else {
        console.log(`Player ${_seatNumber}-> played ${convert2ReadableNames(_cardsPlayed).join(",")}.`);
    }
}
function illegalCards_S2C(data) {
    console.log("Illegal Cards.");
    playTurn({ seatNumber: seatNumber });
}
function gameEnd_S2C(data) {
    let _winnerSeatNumber = data.seatNumber;
    let _isWin = _winnerSeatNumber === seatNumber;
    let _content = _isWin ? "Congratulations, you win!" : "Oh, you lose.";
    console.log(_content);
    resetWhenGameEnd();

    console.log("Press Enter to restart.")
    getInputFromCmd();
    startGame();
}

function competeForLandLordRole_C2S(score) {
    console.log(`You has called ${score} score`);
    send({ cmd: card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, body: { score: score, seatNumber: seatNumber } });
}
function playTurn_S2C(data) {
    let _seatNumber = data.seatNumber;
    if (_seatNumber == seatNumber) {
        //update hand cards
        if (data.handCards) mCardsArr = sortByValue(data.handCards);
        playCards_C2S();
    }
}
function gameStart_S2C(data) {
    let _seatNumber = data.seatNumber;
    let _playerID = data.playerID;

    seatNumber = _seatNumber;
    playerID = _playerID;
}
function broadCastMsg_S2C(data) {
    let _msg = data.msg;
    console.log(_msg);
}

//====== data and custom function bellow ======
var seatNumber;
var playerID;
function startGame() {
    send({ cmd: card_game_pb.Cmd.READY_C2S, body: null });
}
function playTurn(data) {
    playTurn_S2C(data);
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

function resetWhenGameEnd() {
    seatNumber = null;
    playerID = null;
}