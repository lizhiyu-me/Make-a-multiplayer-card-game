import { puremvc } from "../../lib/puremvc";
import GameModel from "../model/GameModel";
import * as card_game_pb from "../../../share/proto/card-game";

export default class Encoder {
    constructor() { }
    encodeData(data) {
        let _cmd = data.cmd;
        let _dataBody = data.body;
        let _bytesData;

        let _gameModel = this.getGameModel();
        switch (_cmd) {
            case card_game_pb.Cmd.READY_C2S:
                _bytesData = card_game_pb.ReadyC2S.encode({ seatNumber: _gameModel.seatNumber }).finish();
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

    private getGameModel(): GameModel {
        return (puremvc.Facade.getInstance("GameFacade") as puremvc.Facade).retrieveProxy("GameModel");
    }
}