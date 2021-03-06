import { puremvc } from "../../lib/puremvc";
export default class GameModel extends puremvc.Proxy {
    constructor() {
        super("GameModel");
    }
    /**
     * * rJkr for redJoker
     * * bJkr for blackJoker
     */
    readonly cardNameNumberDic: { readonly [key: string]: number } = {
        'rJkr': 0x0f,
        'bJkr': 0x0e,
        '2': 0x02,
        'A': 0x01,
        'K': 0x0d,
        'Q': 0x0c,
        'J': 0x0b,
        '10': 0x0a,
        '9': 0x09,
        '8': 0x08,
        '7': 0x07,
        '6': 0x06,
        '5': 0x05,
        '4': 0x04,
        '3': 0x03,
        'a': 0x01,
        'k': 0x0d,
        'q': 0x0c,
        'j': 0x0b,
    }
    /**
     * * rJkr for redJoker
     * * bJkr for blackJoker
     */
    readonly cardNumberNameDic: { readonly [key: number]: string } = {
        0x0f: 'rJkr',
        0x0e: 'bJkr',
        0x02: '2',
        0x01: 'A',
        0x0d: 'K',
        0x0c: 'Q',
        0x0b: 'J',
        0x0a: '10',
        0x09: '9',
        0x08: '8',
        0x07: '7',
        0x06: '6',
        0x05: '5',
        0x04: '4',
        0x03: '3'
    }
    private _mainSeverSeatNumber: number = -1;
    public get mainServerSeatNumber(): number {
        return this._mainSeverSeatNumber;
    }
    public set mainServerSeatNumber(v: number) {
        this._mainSeverSeatNumber = v;
    }
    playerID: number = -1;
    playerCount: number = 3;
    getClientSeatNumber(serverSeatNumber: number): number {
        if (this.mainServerSeatNumber === -1) {
            console.log("mainWorldChairId is not set");
            return -1;
        }
        let _distance: number = serverSeatNumber - this.mainServerSeatNumber;
        let _localChairId: number = _distance >= 0 ? _distance : _distance + this.playerCount;
        return _localChairId;
    }
    getCardReadableName(cardNumber:number): string {
        let _cardNumber = Number(cardNumber);
        let _value = _cardNumber % 0x10;
        return this.cardNumberNameDic[_value];
    }
    convert2ReadableNames(cardsArr:number[]): string[] {
        let _res = [];
        for (let i = 0, len = cardsArr.length; i < len; i++) {
            let _cardNumber = cardsArr[i];
            _res.push(this.getCardReadableName(_cardNumber));
        }
        return _res;
    }
    convert2CardNumbers(cardNames:string[]): number[] {
        let _res = [];
        for (let i = 0, len = cardNames.length; i < len; i++) {
            let _cardName = cardNames[i];
            _res.push(this.cardNameNumberDic[_cardName]);
        }
        return _res;
    }
    
    private _cardsArr : number[] = [1,2,3,4];
    public get cardsArr() : number[] {
        return this._cardsArr;
    }
    public set cardsArr(v : number[]) {
        this._cardsArr = v;
        this.mMainCardsHook && this.mMainCardsHook(v)
    }

    
    private _outCards : number[][] = [[],[],[]];
    public get outCards() : number[][] {
        return this._outCards;
    }
    public set outCards(v : number[][]) {
        this._outCards = v;
        this.mOutCardsHook && this.mOutCardsHook(v)
    }

    
    private _context : any;
    public get context() : any {
        return this._context;
    }
    public set context(v : any) {
        this._context = v;
    }
    
    

    private mMainCardsHook!:Function;
    setMainHandCardsHook(hook:Function){
        this.mMainCardsHook = hook; 
    }
    private mOutCardsHook!:Function;
    setOutCardsHook(hook:Function){
        this.mOutCardsHook = hook; 
    }
    
    getCardValue(cardSerialNumber:number) {
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

    removePlayerCards(playedCards:number[]) {
        let _handCardsArr = this.cardsArr.slice();
        for (let i = 0; i < playedCards.length; i++) {
            let item = playedCards[i];
            let _idx = _handCardsArr.indexOf(item);
            _handCardsArr.splice(_idx, 1);
        }
        this.cardsArr = _handCardsArr; 
        return _handCardsArr;
    }

    sortByValue(arr:number[]) {
        return arr.sort((a, b) => {
            return this.getCardValue(b) - this.getCardValue(a);
        })
    }

    resetWhenGameEnd() {
        this.mainServerSeatNumber = -1;
    }
}