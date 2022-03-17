
import { E_TYPE, E_TYPE_LEVEL, OrderTopLimitVal, TypeDefinition, TypeLevelDic } from "./Config";
import { T_CHECK_RES, T_TYPE_DATA, T_VALUE_ITEM } from "./Const";
import { MetaProcessor } from "./MetaProcessor";
import { getGameValue, getIsLineLimitType, getSortedValueItemArr } from "./SpecificGetFn";
import Utils from "./utils/utils";

export interface T_CHECK_RES_FINAL {
    main: T_CHECK_RES;
    subArr: T_CHECK_RES[];
    type: E_TYPE;
}
export type T_SUBTYPE_RULER = {
    beginIdx: number,
    itemCount: number,
    minCount: number
}
export default class Ruler {
    constructor() { }

    private getMainTypeResArr(ownArr: number[], type: number, ruler: {
        beginIdx: number;
        len: number;
        itemCount: number;
    }): T_CHECK_RES[] {
        let _res: T_CHECK_RES[] = [];
        let _curArr: T_VALUE_ITEM[] = getSortedValueItemArr(ownArr);
        let { beginIdx, len, itemCount } = ruler;

        let _totalCount: number = len * itemCount;
        let _arr2Measure: T_VALUE_ITEM[];
        let _sliceLen: number;
        while (_arr2Measure = _curArr.slice(beginIdx, beginIdx + len),
            _sliceLen = _arr2Measure.length,
            _sliceLen === len) {
            let _arr: number[] = [];
            _arr2Measure.forEach((item) => {
                if (len >= 2 && getIsLineLimitType(type) && item.value > OrderTopLimitVal) return;
                if (item.count >= itemCount) {
                    _arr = _arr.concat(item.arr.slice(0, itemCount));
                }
            })

            if (_arr.length === _totalCount) {
                _res.push({
                    arr: _arr
                })
            }
            ++beginIdx;
        }
        return _res;
    }

    private getSubTypeResArr(ownArrExcludeMain: number[], attacktSubTypeRuler: { itemCount: number }, subTypeCount: number, setCount: number): T_CHECK_RES[] {
        if (subTypeCount === 0) return [];
        let _res: T_CHECK_RES[] = [];
        let itemCount = attacktSubTypeRuler.itemCount;
        let _metaProcessorArr = this.getMetaProcessors(ownArrExcludeMain);
        for (let i = 0; i < _metaProcessorArr.length; i++) {
            const _metaProcessor = _metaProcessorArr[i];
            let _fulfiledItem: number[][] = _metaProcessor.getMeta(itemCount);
            if (_fulfiledItem && _fulfiledItem.length != 0) {
                for (let j = 0, _len = setCount; j < _len; j++) {
                    let _temp = _fulfiledItem[j];
                    if (!_temp) continue;
                    let _arrItem = _temp.slice();
                    _res.push({
                        arr: _arrItem
                    })
                    _fulfiledItem[0].length = 0;
                    _metaProcessor.update(_fulfiledItem["flat"]());
                }
            }
        }
        return _res;
    }

    private getMetaProcessors(serials: number[]): MetaProcessor[] {
        let _curArr: T_VALUE_ITEM[] = getSortedValueItemArr(serials);
        let _res = [];
        for (const item of _curArr) {
            let _metaProcessor = new MetaProcessor(item.arr);
            _metaProcessor.val = item.value;
            _res.push(_metaProcessor);
        }
        return _res;
    }

    private getTypeLevel(type: E_TYPE): E_TYPE_LEVEL {
        for (const level in TypeLevelDic) {
            if (TypeLevelDic[level].indexOf(type) != -1) {
                return +level;
            }
        }
    }

    canDefeat(handSerialArr: number[], attackerArr: number[], attackerType: number): { can: boolean, type: E_TYPE } {
        let can = false, type = E_TYPE.ERROR;
        let _handType = this.checkCardType(handSerialArr);
        if (_handType != E_TYPE.ERROR) {
            let _handTypeLevel = this.getTypeLevel(_handType);
            let _attackerTypeLevel = this.getTypeLevel(attackerType);
            //top level type have only one to play in a game round
            if (_attackerTypeLevel != _handTypeLevel) {
                if (_handTypeLevel > _attackerTypeLevel) {
                    can = true;
                    type = _handType;
                }
            } else {
                if (_handTypeLevel == E_TYPE_LEVEL.ONE) {
                    if (handSerialArr.length == attackerArr.length) {
                        let _typeDef = TypeDefinition[attackerType];
                        let _mainTypeContainCount = _typeDef.metaType;
                        let _oneSetCount = this.getOneSetCount(_typeDef);
                        let _attackerMainTypeResArr = this.getMainTypeResArr(attackerArr, attackerType, {
                            beginIdx: 0,
                            len: attackerArr.length / _oneSetCount,
                            itemCount: _mainTypeContainCount
                        });
                        let _beginIdx = getGameValue(_attackerMainTypeResArr[0].arr[0]) - 2;
                        let _handMainTypeResArr = this.getMainTypeResArr(handSerialArr, _handType, {
                            beginIdx: _beginIdx,
                            len: handSerialArr.length / _oneSetCount,
                            itemCount: _mainTypeContainCount
                        });
                        if (_handMainTypeResArr.length != 0) {
                            can = true;
                            type = attackerType;
                        };
                    }
                } else if (_handTypeLevel == E_TYPE_LEVEL.TWO) {
                    let _handVal = getGameValue(handSerialArr[0]);
                    let _attackerVal = getGameValue(attackerArr[0]);
                    if (_handVal > _attackerVal) {
                        can = true;
                        type = attackerType;
                    }
                }
            }
        }
        return { can, type };
    }

    checkCardType(serialArr: number[]): E_TYPE {
        for (const e in E_TYPE) {
            let _e: E_TYPE = +e;
            if (isNaN(_e) || _e == E_TYPE.ERROR) continue;
            else if (this.isType(serialArr, _e)) return _e;
        }
        return E_TYPE.ERROR;
    }

    /**Get type one set count
     * @example ```
     * - TRIPLE_ORDER_TAKE_ONE: 3+1;
     * - DOUBLE_ORDER: 2;
     * - QUADRUPLE_TAKE_TWO_SINGLE: 4+2;
     * ```
     * */
    private getOneSetCount(def: T_TYPE_DATA): number {
        let _mainTypeCount = def.metaType;
        let _subTypeCount = def.subTypeData ? def.subTypeData.metaType * def.subTypeData.count : 0;
        return _subTypeCount + _mainTypeCount;
    }

    private isCountOK(def: T_TYPE_DATA, serialsTotalCount: number, setCount: number): boolean {
        let _subTypeCount = def.subTypeData ? def.subTypeData.metaType * def.subTypeData.count : 0;
        if (setCount % 1) return false;
        else if (def.minCount) {
            let _minCount = def.minCount * (def.metaType + _subTypeCount);
            if (serialsTotalCount < _minCount) return false;
        } else if (def.count) {
            let _certainCount = def.count * def.metaType + _subTypeCount;
            if (serialsTotalCount != _certainCount) return false;
        }
        return true;
    }

    private isType(serialArr: number[], type: E_TYPE): boolean {
        let _def = TypeDefinition[type];
        let _serialsTotalCount = serialArr.length;
        let _oneSetCount = this.getOneSetCount(_def);
        let _setCount = _serialsTotalCount / _oneSetCount;
        if (!this.isCountOK(_def, _serialsTotalCount, _setCount)) return false;

        if (_def.val) {
            return Utils.arraysEqual(serialArr, _def.val);
        } else {
            let _mainItemContainCount = _def.metaType;
            let _hasSubType = !!_def.subTypeData;

            let _mainTypeResArr = this.getMainTypeResArr(serialArr, type, {
                beginIdx: 0,
                len: _setCount,
                itemCount: _mainItemContainCount
            });
            if (_mainTypeResArr.length == 0) return false;
            else if (!_hasSubType) return true;
            else {
                for (let i = 0; i < _mainTypeResArr.length; i++) {
                    const _mainTypeSerialArr = _mainTypeResArr[i];
                    let _serialsExcludeMainType = Utils.removeArrFromArr(serialArr, _mainTypeSerialArr.arr);
                    let _subTypeResArr = this.getSubTypeResArr(_serialsExcludeMainType, { itemCount: _def.subTypeData.metaType }, _def.subTypeData.count, _setCount);
                    if (_subTypeResArr.length == _setCount * _def.subTypeData.count) return true;
                }
            }
        }
        return false;
    }
}
