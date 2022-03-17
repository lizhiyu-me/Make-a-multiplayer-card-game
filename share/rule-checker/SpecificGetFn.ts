
import { E_TYPE, E_TYPE_LEVEL, LimitOrderTypeArr, TypeLevelDic, ValueCountDic, ValueDic } from "./Config";
import { E_FACE, T_VALUE_ITEM } from "./Const";

export function getGameValue(serialNum: number): number {
    let _faceVal: E_FACE = getFaceValue(serialNum);
    return ValueDic[_faceVal];
}

export function getFaceValue(serialNum: number): number {
    return serialNum % 0x10;
}

export function getCurValueDic(arr: number[]): { [val: number]: number[] } {
    let _valueDic: { [val: number]: number[] } = {};
    arr.forEach((num) => {
        let _val = getGameValue(num);
        let _valItem: number[] = _valueDic[_val];
        if (!_valItem) {
            _valItem = _valueDic[_val] = [];
        }
        _valItem.push(num);
    })
    return _valueDic;
}

export function getSortedValArr(): number[] {
    let _arr: number[] = [];
    for (const val in ValueDic) {
        if (Object.prototype.hasOwnProperty.call(ValueDic, val)) {
            const _gameVal = ValueDic[val];
            _arr.push(_gameVal);
        }
    }
    return _arr.sort((a, b) => { return a - b });
}

export function getIsInTopLevel(type: E_TYPE): boolean {
    return TypeLevelDic[E_TYPE_LEVEL.TOP].indexOf(type) != -1;
}

export function getSortedValueItemArr(arr: number[]): T_VALUE_ITEM[] {
    let _resArr: T_VALUE_ITEM[] = [];
    let _valObj = getCurValueDic(arr);
    let _valArr = getSortedValArr();
    for (let val of _valArr) {
        let _item: T_VALUE_ITEM = {
            value: +val,
            count: ValueCountDic[val],
            arr: _valObj[val] ? _valObj[val] : []
        }
        _resArr.push(_item);
    }
    return _resArr;
}

export function getIsLineLimitType(type: E_TYPE): boolean {
    return LimitOrderTypeArr.indexOf(type) != -1;
}
