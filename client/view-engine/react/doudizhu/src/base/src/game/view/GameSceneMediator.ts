import { puremvc } from "../../lib/puremvc";
import * as card_game_pb from "../../proto/card-game";
import BaseMediator from "../base/BaseMediator";
import GameModel from "../model/GameModel";

export enum EGAME_SCENE_EVENT {
    PLAYTURN_S2C,
    GAME_END_S2C,
    PLAYCARDS_S2C,
    GAME_START_S2C,
    DEAL_CARDS_S2C,
    ILLEGAL_CARDS_S2C,
    COMPETE_FOR_LANDLORD_S2C,

    REFRESH_HAND_CARDS_VIEW,
    SHOW_PLAYER_INFO_VIEW,
}

export interface IGameSceneView {
    getViewComponent(name: string),
    getNewViewComponent(comp),
    getChild(childPath, parent),
    addClickListener(comp, handler, target),
    setCard(card, name),
    setLabel(labelComp, text),
    removeAllChildren(parent),
    addChild(child, parent),
    isCardSelected(card),
    toggleCardSelectedStatus(card),
    showComponent(comp),
    hideComponent(comp)
}
export default class GameSceneMediator extends BaseMediator {
    static eventObj: { [key in EGAME_SCENE_EVENT]?: symbol } = {};
    constructor(viewComponent, viewClass, private mViewClass: IGameSceneView = viewClass) {
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
                let _btnStart = this.mViewClass.getViewComponent("btnStart");
                this.mViewClass.showComponent(_btnStart);
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.GAME_START_S2C]:
                {
                    let _btnStart = this.mViewClass.getViewComponent("btnStart");
                    this.mViewClass.hideComponent(_btnStart);
                }
                break;
            case GameSceneMediator.eventObj[EGAME_SCENE_EVENT.ILLEGAL_CARDS_S2C]:
                this.showControlPanelOperation();
                break;
        }
    }

    dealCards(cards: number[]) {
        return;
        console.log("GameSceneMediator::dealCards::cards ", cards)
        let _cardsContainer = this.mViewClass.getViewComponent("handList");
        this.mViewClass.removeAllChildren(_cardsContainer);
        let _cardPrefabNode = this.mViewClass.getViewComponent("card");
        let _cardCount = cards.length;
        let _beginX = -_cardCount * 40 / 2 + 60;
        for (let i = 0; i < cards.length; i++) {
            let _cardSerial = cards[i];
            let _card = this.mViewClass.getNewViewComponent(_cardPrefabNode);
            _card && (_card["_d_cardSerial"] =_card["data-card-serial"] = _cardSerial);
            this.mViewClass.setCard(_card, this.getGameModel().getCardReadableName(_cardSerial));
            this.mViewClass.addClickListener(_card, () => {
                this.mViewClass.toggleCardSelectedStatus(_card);
            }, this);
            _card.style.left = _beginX+i * 40 + "px"
            this.mViewClass.addChild(_card, _cardsContainer);
        }
    }

    onRegister(): void {
        this.addViewComponentEvent();
        this.initViewComp();
        this.getNetFacade().sendNotification(card_game_pb.Cmd.READY_C2S);
        this.setStatusLabel("Waiting for other players");
    }

    private initViewComp(){
        let _scorePanel = this.mViewClass.getViewComponent("controlPanel-scores");
        let _operationPanel = this.mViewClass.getViewComponent("controlPanel-operation");
        _scorePanel.style.visibility = "hidden";
        _operationPanel.style.visibility = "hidden";
    }

    private addViewComponentEvent() {
        let _btnScore1 = this.mViewClass.getViewComponent("controlPanel-scores-1");
        let _btnScore2 = this.mViewClass.getViewComponent("controlPanel-scores-2");
        let _btnScore3 = this.mViewClass.getViewComponent("controlPanel-scores-3");
        this.mViewClass.addClickListener(_btnScore1, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 1);
        }, this)
        this.mViewClass.addClickListener(_btnScore2, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 2);
        }, this)
        this.mViewClass.addClickListener(_btnScore3, () => {
            this.hideControlPanel();
            this.getNetFacade().sendNotification(card_game_pb.Cmd.COMPETEFORLANDLORDROLE_C2S, 3);
        }, this)

        let _btnPlay = this.mViewClass.getViewComponent("controlPanel-operation-play");
        let _btnPass = this.mViewClass.getViewComponent("controlPanel-operation-pass");
        this.mViewClass.addClickListener(_btnPlay, this.onOutCards_C2S.bind(this), this)
        this.mViewClass.addClickListener(_btnPass, this.onPass_C2S.bind(this), this)

        let _btnStart = this.mViewClass.getViewComponent("btnStart");
        this.mViewClass.addClickListener(_btnStart, this.onReady_C2S.bind(this), this);
    }
    private onOutCards_C2S() {
        this.hideControlPanel();
        let _outCardsSerial = [];
        let _cardsContainer = this.mViewClass.getViewComponent("handList");
        let _cards = _cardsContainer.children;
        for (let i = 0; i < _cards.length; i++) {
            let _card = _cards[i];
            if (this.mViewClass.isCardSelected(_card)) {
                _outCardsSerial.push(_card["_d_cardSerial"] || _card.getAttribute("data-card-serial"));
            }
        }
        this.getNetFacade().sendNotification(card_game_pb.Cmd.PLAYCARDS_C2S, _outCardsSerial);
    }
    private showOutCards(serials: number[], seatNumber: number) {
        this.clearOutList(seatNumber);
        let _outCardsContainer = this.mViewClass.getViewComponent("outLists/" + seatNumber);

        let _cardPrefabNode = this.mViewClass.getViewComponent("prefabs/card");
        for (let i = 0; i < serials.length; i++) {
            let _cardSerial = serials[i];
            let _card = this.mViewClass.getNewViewComponent(_cardPrefabNode);
            this.mViewClass.setCard(_card, this.getGameModel().getCardReadableName(_cardSerial));
            this.mViewClass.addChild(_card, _outCardsContainer);
        }
    }
    private clearOutList(seatNumber: number) {
        let _clientSeatNumber = this.getGameModel().getClientSeatNumber(seatNumber);
        let _outCardsContainer = this.mViewClass.getViewComponent("outLists/" + _clientSeatNumber);
        this.mViewClass.removeAllChildren(_outCardsContainer);
    }
    private onPass_C2S() {
        this.hideControlPanel();
        this.getNetFacade().sendNotification(card_game_pb.Cmd.PLAYCARDS_C2S, []);
    }
    private onReady_C2S() {
        this.getNetFacade().sendNotification(card_game_pb.Cmd.READY_C2S);
    }

    private showControlPanelScores(curMaxScore: number) {
        console.log("showControlPanelScores")
        this.mViewClass.showComponent(this.mViewClass.getViewComponent("controlPanel-scores"));
        this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-operation"));

        let _btnScore1 = this.mViewClass.getViewComponent("controlPanel-scores-1");
        let _btnScore2 = this.mViewClass.getViewComponent("controlPanel-scores-2");
        let _btnScore3 = this.mViewClass.getViewComponent("controlPanel-scores-3");

        if(curMaxScore == 1){
            _btnScore1.disabled = true;
        }else if(curMaxScore == 2){
            _btnScore1.disabled = true;
            _btnScore2.disabled = true;
        }
    }
    private showControlPanelOperation(seatNumber?: number) {
        if (seatNumber == this.getGameModel().mainServerSeatNumber || seatNumber == undefined) {
            this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-scores"));
            this.mViewClass.showComponent(this.mViewClass.getViewComponent("controlPanel-operation"));
        } else {
            this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-scores"));
            this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-operation"));
        }
    }
    private hideControlPanel() {
        this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-scores"));
        this.mViewClass.hideComponent(this.mViewClass.getViewComponent("controlPanel-operation"));
    }

    private showMainPlayerInfo(playerID, serverSeatNumber) {
        this.mViewClass.setLabel(this.mViewClass.getViewComponent("mainPlayerInfo/playerID"), playerID + "");
        this.mViewClass.setLabel(this.mViewClass.getViewComponent("mainPlayerInfo/serverSeatNumber"), serverSeatNumber + "");
    }

    private setStatusLabel(text: string) {
        this.mViewClass.setLabel(this.mViewClass.getViewComponent("status"), text);
    }

    private getGameModel(): GameModel {
        return puremvc.Facade.getInstance("GameFacade").retrieveProxy("GameModel");
    }

    private getNetFacade() {
        return puremvc.Facade.getInstance("NetFacade");
    }
}