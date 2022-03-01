var proto = require("./proto/out/card-game_pb");
var msg = new proto.Ready_C2S();
msg.setSeatNumber(257);

var bytes = msg.serializeBinary();

console.log(bytes);
let _msg = proto.Ready_C2S.deserializeBinary(bytes);
console.log(_msg);
_msg.getSeatNumber();
