import { puremvc } from "../../lib/puremvc";
import GameModel from "../model/GameModel";
import * as card_game_pb from "../../proto/protobuf_bundle";

export default class Encoder {
    constructor() { }
    encodeData(data) {
        let _cmd = data.cmd;
        let _dataBody = data.body;
        let _bytesData;

        let _gameModel = this.getGameModel();
        switch (_cmd) {
            case card_game_pb.Cmd.READY_C2S:
                _bytesData = card_game_pb.Ready_C2S.encode({ seatNumber: _gameModel.seatNumber }).finish();
                break;
            case card_game_pb.Cmd.PLAYCARDS_C2S:
                _bytesData = card_game_pb.PlayCards_C2S.encode({ seatNumber: _dataBody.seatNumber, cards: _dataBody.cards }).finish();
                break;
            case card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S:
                _bytesData = card_game_pb.CompeteForLandLordRole_C2S.encode({ seatNumber: _dataBody.seatNumber, score: _dataBody.score }).finish();
                break;
        }
        if (_bytesData) {
            // let _completeData = card_game_pb.MainMessage.encode({
            //     cmdId: _cmd,
            //     data: _bytesData
            // }).finish();
            let _mainMsgData = card_game_pb.MainMessage.create();
            _mainMsgData.cmdId = _cmd;
            _mainMsgData.data = _bytesData;
            let _completeData = card_game_pb.MainMessage.encode(_mainMsgData).finish();
            return _completeData;
        }
        return null;
    }

    private getGameModel(): GameModel {
        return (puremvc.Facade.getInstance("GameFacade") as puremvc.Facade).retrieveProxy("GameModel");
    }
}