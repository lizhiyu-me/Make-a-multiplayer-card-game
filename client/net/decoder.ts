import * as card_game_pb from "../../share/proto/card-game";
import { puremvc } from "../lib/puremvc";
import { NetFacade } from "./NetFacade";
export default class Decoder {
    static NAME: string = "Decoder"
    constructor() {
    }

    decodeData(buffer) {
        let _mainMsg: card_game_pb.MainMessage = card_game_pb.MainMessage.decode(buffer);
        let _cmd = _mainMsg.cmdId;
        let _bytesData = _mainMsg.data;
        switch (_cmd) {
            case card_game_pb.Cmd.DEALCARDS_S2C:
                this.emitEvent(_cmd,card_game_pb.DealCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYCARDS_S2C:
                this.emitEvent(_cmd,card_game_pb.PlayCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.ILLEGALCARDS_S2C:
                this.emitEvent(_cmd,card_game_pb.IllegalCardsS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMEEND_S2C:
                this.emitEvent(_cmd,card_game_pb.GameEndS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.PLAYTURN_S2C:
                this.emitEvent(_cmd,card_game_pb.PlayTurnS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.GAMESTART_S2C:
                this.emitEvent(_cmd,card_game_pb.GameStartS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_S2C:
                this.emitEvent(_cmd,card_game_pb.CompeteForLandLordRoleS2C.decode(_bytesData));
                break;
            case card_game_pb.Cmd.BROADCAST_MSG_S2C:
                this.emitEvent(_cmd,card_game_pb.BroadCastMsgS2C.decode(_bytesData));
                break;
            default:
                console.log("no message matched.")
        }
    }

    private emitEvent(cmd, data) {
        puremvc.Facade.getInstance(NetFacade.NAME).sendNotification(cmd, data);
    }
}