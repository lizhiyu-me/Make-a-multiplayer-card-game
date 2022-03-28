import { puremvc } from "../../lib/puremvc";
import * as card_game_pb from "../../proto/protobuf_bundle";
export default class Decoder {
    constructor() {}
    decodeData(msgEvent) {
        let _buffer = msgEvent.data;
        let _mainMsg: card_game_pb.MainMessage = card_game_pb.MainMessage.decode(_buffer);
        let _cmd = _mainMsg.cmdId;
        let _bytesData = _mainMsg.data;
        switch (_cmd) {
            case card_game_pb.Cmd.DEALCARDS_S2C:
                this.emitEvent(_cmd, card_game_pb.DealCards_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYCARDS_S2C:
                this.emitEvent(_cmd, card_game_pb.PlayCards_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.ILLEGALCARDS_S2C:
                this.emitEvent(_cmd, card_game_pb.IllegalCards_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMEEND_S2C:
                this.emitEvent(_cmd, card_game_pb.GameEnd_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYTURN_S2C:
                this.emitEvent(_cmd, card_game_pb.PlayTurn_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMESTART_S2C:
                this.emitEvent(_cmd, card_game_pb.GameStart_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C:
                this.emitEvent(_cmd, card_game_pb.CompeteForLandLordRole_S2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.BROADCAST_MSG_S2C:
                this.emitEvent(_cmd, card_game_pb.BroadCastMsg_S2C.decode(_bytesData));
                break;
            default:
                console.log("no message matched.")
        }
    }
    private emitEvent(cmd, data) {
        puremvc.Facade.getInstance("NetFacade").sendNotification(cmd, data);
    }
}