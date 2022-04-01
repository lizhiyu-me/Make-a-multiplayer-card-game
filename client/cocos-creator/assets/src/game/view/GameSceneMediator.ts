import { Ready_C2S } from './../../proto/protobuf_bundle.d';
import { puremvc } from "../../lib/puremvc";
import BaseMediator from "../base/BaseMediator";
import * as card_game_pb from "../../proto/protobuf_bundle";
import GameModel from "../model/GameModel";

export enum EGAME_SCENE_EVENT {
    COMPETE_FOR_LANDLORD_S2C,
    DEAL_CARDS_S2C,
    PLAYTURN_S2C,
    PLAYCARDS_S2C,
    REFRESH_HAND_CARDS_VIEW,
    SHOW_PLAYER_INFO_VIEW,
    GAME_START_S2C,
    GAME_END_S2C,
}
export default class GameSceneMediator extends BaseMediator {
    static eventObj: { [key in EGAME_SCENE_EVENT]?: symbol } = {};
    constructor(viewComponent) {
        super("GameSceneMediator", viewComponent);
    }
    listNotificationInterests() {
        return this.getNotificationSymbols(EGAME_SCENE_EVENT, GameSceneMediator);
    }
    handleNotification(notification: any): void {
        let _nameSymbol = notification.getName();
        let _data = notification.getBody();
        switch (_nameSymbol) {
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.COMPETE_FOR_LANDLORD_S2C]:
                this.setStatusLabel("Lord Role Confirming");
                this.showControlPanelScores(_data.curMaxScore);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.DEAL_CARDS_S2C]:
                this.setStatusLabel("Dealing");
                this.dealCards(_data);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.PLAYTURN_S2C]:
                this.setStatusLabel("Player " + _data + " 's turn");
                this.clearOutList(_data);
                this.showControlPanelOperation(_data);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.PLAYCARDS_S2C]:
                this.setStatusLabel("");
                let _clientSeatNumber = this.getGameModel().getClientSeatNumber(_data.seatNumber);
                this.showOutCards(_data.cards, _clientSeatNumber);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.REFRESH_HAND_CARDS_VIEW]:
                let _curHandCards = this.getGameModel().cardsArr;
                this.dealCards(_curHandCards);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.SHOW_PLAYER_INFO_VIEW]:
                this.showMainPlayerInfo(_data.playerID, _data.seatNumber)
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.GAME_END_S2C]:
                let _content = _data ? "Congratulations, you win!" : "Oh, you lose.";
                this.setStatusLabel(_content);
                let _btnStart = cc.find("Canvas/btnStart");
                _btnStart.active = true;
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.GAME_START_S2C]:
                {
                    let _btnStart = cc.find("Canvas/btnStart");
                    _btnStart.active = false;
                }
                break;
        }
    }

    dealCards(cards: number[]) {
        let _cardsContainer = cc.find("Canvas/handList");
        _cardsContainer.removeAllChildren();
        let _cardPrefabNode = cc.find("Canvas/prefabs/card");
        for (let i = 0; i < cards.length; i++) {
            let _cardSerial = cards[i];
            let _card = cc.instantiate(_cardPrefabNode);
            let _faceValLabel = cc.find("val", _card);
            _faceValLabel.getComponent(cc.Label).string = this.getGameModel().getCardReadableName(_cardSerial);
            _card["_d_cardSerial"] = _cardSerial;
            _card.active = true;
            _card.on(cc.Node.EventType.TOUCH_START, () => {
                _card.y = _card.y == 0 ? 30 : 0;
            }, this);
            _cardsContainer.addChild(_card);
        }
    }

    onRegister(): void {
        this.addViewComponentEvent();

        this.getNetFacade().sendNotification(card_game_pb.Cmd.READY_C2S);
        this.setStatusLabel("Waiting for other players");
    }

    private addViewComponentEvent() {
        let _btnScore1 = cc.find("Canvas/controlPanel/scores/1");
        let _btnScore2 = cc.find("Canvas/controlPanel/scores/2");
        let _btnScore3 = cc.find("Canvas/controlPanel/scores/3");
        _btnScore1.on(cc.Node.EventType.TOUCH_START, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 1);
        })
        _btnScore2.on(cc.Node.EventType.TOUCH_START, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 2);
        })
        _btnScore3.on(cc.Node.EventType.TOUCH_START, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 3);
        })

        let _btnOut = cc.find("Canvas/controlPanel/operation/out");
        let _btnPass = cc.find("Canvas/controlPanel/operation/pass");
        _btnOut.on(cc.Node.EventType.TOUCH_START, this.onOutCards_C2S.bind(this))
        _btnPass.on(cc.Node.EventType.TOUCH_START, this.onPass_C2S.bind(this))

        let _btnStart = cc.find("Canvas/btnStart");
        _btnStart.on(cc.Node.EventType.TOUCH_START, this.onReady_C2S.bind(this));
    }
    private onOutCards_C2S() {
        this.hideControlPanel();
        let _outCardsSerial = [];
        let _cardsContainer = cc.find("Canvas/handList");
        let _cards = _cardsContainer.children;
        for (let i = 0; i < _cards.length; i++) {
            let _card = _cards[i];
            if (_card.y != 0) _outCardsSerial.push(_card["_d_cardSerial"]);
        }
        this.getNetFacade().sendNotification(card_game_pb.Cmd.PLAYCARDS_C2S, _outCardsSerial);
    }
    private showOutCards(serials: number[], seatNumber: number) {
        this.clearOutList(seatNumber);
        let _outCardsContainer = cc.find("Canvas/outLists/" + seatNumber);

        let _cardPrefabNode = cc.find("Canvas/prefabs/card");
        for (let i = 0; i < serials.length; i++) {
            let _cardSerial = serials[i];
            let _card = cc.instantiate(_cardPrefabNode);
            let _faceValLabel = cc.find("val", _card);
            _faceValLabel.getComponent(cc.Label).string = this.getGameModel().getCardReadableName(_cardSerial);
            _card.active = true;
            _outCardsContainer.addChild(_card);
        }
    }
    private clearOutList(seatNumber: number) {
        let _clientSeatNumber = this.getGameModel().getClientSeatNumber(seatNumber);
        let _outCardsContainer = cc.find("Canvas/outLists/" + _clientSeatNumber);
        _outCardsContainer.removeAllChildren();
    }
    private onPass_C2S() {
        this.hideControlPanel();
        this.getNetFacade().sendNotification(card_game_pb.Cmd.PLAYCARDS_C2S, []);
    }
    private onReady_C2S() {
        this.getNetFacade().sendNotification(card_game_pb.Cmd.READY_C2S);
    }

    private showControlPanelScores(curMaxScore: number) {
        cc.find("Canvas/controlPanel/scores").active = true;
        cc.find("Canvas/controlPanel/operation").active = false;

        let _btnScore1 = cc.find("Canvas/controlPanel/scores/1");
        let _btnScore2 = cc.find("Canvas/controlPanel/scores/2");

        _btnScore1.active = curMaxScore == 0;
        _btnScore2.active = curMaxScore <= 1;
    }
    private showControlPanelOperation(seatNumber: number) {
        if (seatNumber == this.getGameModel().mainServerSeatNumber) {
            cc.find("Canvas/controlPanel/scores").active = false;
            cc.find("Canvas/controlPanel/operation").active = true;
        } else {
            cc.find("Canvas/controlPanel/scores").active = false;
            cc.find("Canvas/controlPanel/operation").active = false;
        }
    }
    private hideControlPanel() {
        cc.find("Canvas/controlPanel/scores").active = false;
        cc.find("Canvas/controlPanel/operation").active = false;
    }

    private showMainPlayerInfo(playerID, serverSeatNumber) {
        cc.find("Canvas/mainPlayerInfo/playerID").getComponent(cc.Label).string = playerID + "";
        cc.find("Canvas/mainPlayerInfo/serverSeatNumber").getComponent(cc.Label).string = serverSeatNumber + "";
    }

    private setStatusLabel(text: string) {
        cc.find("Canvas/status").getComponent(cc.Label).string = text;
    }

    private getGameModel(): GameModel {
        return puremvc.Facade.getInstance("GameFacade").retrieveProxy("GameModel");
    }

    private getNetFacade() {
        return puremvc.Facade.getInstance("NetFacade");
    }
}