var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var RuleChecker = /** @class */ (function () {
    function RuleChecker() {
    }
    RuleChecker.getCardValue = function (cardSerialNo) {
        var resNum = -1;
        cardSerialNo = Number(cardSerialNo);
        resNum = cardSerialNo % 16;
        //大小王
        if (resNum == 14) {
            resNum = 16;
        }
        else if (resNum == 15) {
            resNum = 17;
        }
        //A,2
        else if (resNum == 1) {
            resNum = 14;
        }
        else if (resNum == 2) {
            resNum = 15;
        }
        return resNum;
    };
    /**
     * 检测选牌是否可出（是否合法牌型，是否大于上家出牌）
     ** cardListArr 当前玩家的手牌数组
     ** pcardListArr 上一次帮助选择出来的牌
     ** cardsType 上一次(上家)的出牌类型
     ** handCardsCount 当前手牌数量
     * @returns 牌的数组
     * */
    RuleChecker.CheckCard = function (cardListArr, pcardListArr, cardsType, handCardsCount) {
        // stf.DdzUtils.showLog("进入牌型检测函数：---cardListArr----", cardListArr, "pcardListArr-----", pcardListArr, "cardsType--------", cardsType);
        var result = { isOK: false, cardsType: [] };
        //检测牌型
        var mcardsTypeObj = RuleChecker.CheckCardType(cardListArr, cardsType);
        // stf.DdzUtils.showLog("牌型检测结果----", mcardsTypeObj);
        var cardsTypeArr = Object.keys(mcardsTypeObj);
        cardsTypeArr = this.getNumberArray(cardsTypeArr.join(","));
        if (cardsTypeArr.length == 0)
            return result;
        // stf.DdzUtils.showLog("cardsTypeArr---", cardsTypeArr);
        var mcardsType = cardsTypeArr[0]; //牌型唯一
        //火箭
        if (mcardsType == CardType.CT_MISSILE_CARD || (mcardsType == CardType.CT_BOMB_CARD && cardsType < CardType.CT_BOMB_CARD)) {
            result["isOK"] = true;
            result["cardsType"] = [mcardsType];
            return result;
        }
        // else if(mcardsType == CardType.CT_BOMB_CARD && cardsType< CardType.CT_BOMB_CARD){
        // }
        if (cardsType == mcardsType || cardsType == -1) {
            if (cardsType == -1 || RuleChecker.isCardGreater(cardListArr, pcardListArr, cardsType)) {
                // stf.DdzUtils.showLog("主动出牌或相同牌型进行比较---cardListArr----", cardListArr, "pcardListArr----", pcardListArr, "cardsType----", cardsType);
                result["isOK"] = true;
                result["cardsType"] = [mcardsType];
            }
        }
        return result;
    };
    /**
     * 对应的数量的值的下标
     */
    RuleChecker.countIndexForValueList = function (valueList, Count) {
        var index = -1;
        var itemList;
        for (var i = 0; i < valueList.length; i++) {
            itemList = valueList[i];
            if (itemList != null && itemList.length == Count) {
                index = i;
                break;
            }
        }
        return index;
    };
    RuleChecker.isCardGreater = function (cardList, pcardList, cardsType) {
        if (cardList.length != pcardList.length)
            return false;
        if (pcardList.length == 0)
            return true;
        if (CardType.CT_SINGLE == cardsType || CardType.CT_DOUBLE == cardsType ||
            CardType.CT_THREE == cardsType) {
            if (this.getCardValue(cardList[0]) > this.getCardValue(pcardList[0]))
                return true;
        }
        else if (CardType.CT_SINGLE_LINE == cardsType) {
            if (RuleChecker.getCardMaxValue(cardList, 1) > RuleChecker.getCardMaxValue(pcardList, 1)) {
                return true;
            }
        }
        else if (CardType.CT_DOUBLE_LINE == cardsType) {
            if (RuleChecker.getCardMaxValue(cardList, 2) > RuleChecker.getCardMaxValue(pcardList, 2)) {
                return true;
            }
        }
        else if (CardType.CT_THREE_LINE == cardsType) {
            if (RuleChecker.getMainValueOfPlane(cardList, 3) > RuleChecker.getMainValueOfPlane(pcardList, 3)) {
                return true;
            }
        }
        else if (CardType.CT_FOUR_TAKE_ONE == cardsType || CardType.CT_FOUR_TAKE_TWO == cardsType || CardType.CT_BOMB_CARD == cardsType) {
            if (RuleChecker.getCardMaxValue(cardList, 4) > RuleChecker.getCardMaxValue(pcardList, 4)) {
                return true;
            }
        }
        else if (CardType.CT_THREE_TAKE_ONE == cardsType || CardType.CT_THREE_TAKE_TWO == cardsType) {
            if (RuleChecker.getCardMaxValue(cardList, 3) > RuleChecker.getCardMaxValue(pcardList, 3)) {
                return true;
            }
        }
        return false;
    };
    /**检测牌型
     * @param cardsType -1 时为本家主动出牌
     */
    RuleChecker.CheckCardType = function (cardList1, cardsType) {
        var cardList = __spreadArrays(cardList1);
        var resObj = {};
        var tempRes = {};
        var valueList = RuleChecker.getCardValueArray(cardList);
        if (RuleChecker.isRocket(cardList)) { //火箭
            // stf.DdzUtils.showLog("火箭成功");
            resObj[CardType.CT_MISSILE_CARD] = true;
            return resObj;
        }
        if (RuleChecker.isBomb(cardList)) { //炸弹
            // stf.DdzUtils.showLog("炸弹成功");
            resObj[CardType.CT_BOMB_CARD] = true;
            return resObj;
        }
        if (cardsType == CardType.CT_FOUR_TAKE_ONE || cardsType == -1) {
            tempRes = RuleChecker.isFour_TwoSingle(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_FOUR_TAKE_ONE] = { speSerialArr: tempRes["speSerialArr"], typeName: "四带两单" };
            }
        }
        if (cardsType == CardType.CT_FOUR_TAKE_TWO || cardsType == -1) {
            tempRes = RuleChecker.isFour_TwoPair(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_FOUR_TAKE_TWO] = { speSerialArr: tempRes["speSerialArr"], typeName: "四带两对" };
            }
        }
        if (cardsType == CardType.CT_SINGLE || cardsType == -1) {
            tempRes = RuleChecker.isSingle(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_SINGLE] = { speSerialArr: tempRes["speSerialArr"] };
                return resObj;
            }
        }
        if (cardsType == CardType.CT_DOUBLE || cardsType == -1) {
            tempRes = RuleChecker.isPair(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_DOUBLE] = { speSerialArr: tempRes["speSerialArr"] };
                return resObj;
            }
        }
        if ((cardsType == CardType.CT_THREE || cardsType == -1)) {
            tempRes = RuleChecker.isThree(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE] = { speSerialArr: tempRes["speSerialArr"] };
            }
        }
        if ((cardsType == CardType.CT_THREE_TAKE_ONE || cardsType == -1)) {
            tempRes = RuleChecker.isThree_One(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE_TAKE_ONE] = { speSerialArr: tempRes["speSerialArr"], doubiChooseArr: tempRes["doubiArr"], typeName: "三带一" };
            }
        }
        if (cardsType == CardType.CT_THREE_TAKE_TWO || cardsType == -1) {
            tempRes = RuleChecker.isThree_Pair(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE_TAKE_TWO] = { speSerialArr: tempRes["speSerialArr"], typeName: "三带对" };
            }
        }
        if (cardsType == CardType.CT_SINGLE_LINE || cardsType == -1) {
            tempRes = RuleChecker.isOrder(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_SINGLE_LINE] = { speSerialArr: tempRes["speSerialArr"], typeName: "顺子" };
            }
        }
        if (cardsType == CardType.CT_DOUBLE_LINE || cardsType == -1) {
            tempRes = RuleChecker.isDouble_Order(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_DOUBLE_LINE] = { speSerialArr: tempRes["speSerialArr"], typeName: "双顺" };
            }
        }
        if (cardsType == CardType.CT_THREE_LINE || cardsType == -1) {
            tempRes = RuleChecker.isThree_Order(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE_LINE] = { speSerialArr: tempRes["speSerialArr"], typeName: "飞机" };
            }
        }
        if (cardsType == CardType.CT_THREE_LINE || cardsType == -1) {
            tempRes = RuleChecker.isThree_Order_Take_One(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE_LINE] = { speSerialArr: tempRes["speSerialArr"], typeName: "飞机带单" };
            }
        }
        if (cardsType == CardType.CT_THREE_LINE || cardsType == -1) {
            tempRes = RuleChecker.isThree_Order_Take_Pair(cardList);
            if (tempRes["isOK"]) {
                resObj[CardType.CT_THREE_LINE] = { speSerialArr: tempRes["speSerialArr"], typeName: "飞机带对" };
            }
        }
        // if (cardsType == CardType.DealCardType_SI_FEI_JI_DAI_ER || cardsType == -1) {
        //     tempRes = RuleChecker.isFour_Order_TwoSingle(cardList);
        //     if (tempRes["isOK"]) {
        //         resObj[CardType.DealCardType_SI_FEI_JI_DAI_ER] = { speSerialArr: tempRes["speSerialArr"], typeName: "四带两单" };
        //     }
        // }
        return resObj;
    };
    RuleChecker.isSingle = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length == 1) {
            resObj["isOK"] = true;
        }
        return resObj;
    };
    RuleChecker.isPair = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length == 2) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            if (objKeysArr.length == 1 && RuleChecker.getCardValue(cardList[0]) < 16) {
                resObj["isOK"] = true;
            }
        }
        return resObj;
    };
    RuleChecker.isOrder = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length < 5)
            return resObj;
        var valueArrObj = RuleChecker.getCardValueArray(cardList);
        var objKeysArr = Object.keys(valueArrObj);
        var count = RuleChecker.getValueOrderCount(valueArrObj, 1);
        if (count >= 5 && count == cardList.length)
            resObj["isOK"] = true;
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isDouble_Order = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length >= 6 && cardList.length % 2 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            var count = RuleChecker.getValueOrderCount(valueArrObj, 2);
            if (count >= 2 && count * 2 == cardList.length)
                resObj["isOK"] = true;
        }
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isThree_Order = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length >= 6 && cardList.length % 3 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            var count = RuleChecker.getValueOrderCount(valueArrObj, 3);
            if (count == cardList.length / 3)
                resObj["isOK"] = true;
        }
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isThree_Order_Take_One = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        var len = cardList.length;
        if (cardList.length >= 8 && cardList.length % 4 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            var count = RuleChecker.getValueOrderCount(valueArrObj, 3);
            // if (count * 4 == len) {
            if (count * 4 == len && RuleChecker.findBomb(cardList, valueArrObj).length == 0) {
                resObj["isOK"] = true;
            }
            else {
                for (var i = count - 1; i > 1; i--) {
                    if (i * 4 == len) {
                        resObj["isOK"] = true;
                    }
                }
            }
        }
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isThree_Order_Take_Pair = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        var len = cardList.length;
        if (cardList.length >= 10 && cardList.length % 5 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            // if (!this.hasnoOtherCountValue(valueArrObj, 3, 2, CardType.CT_THREE_LINE)) return resObj;
            // let count = RuleChecker.getValueOrderCount(valueArrObj, 3);
            //======== 三飞带对可带炸弹 begin ===============
            var _threeCount = 0;
            var _twoCount = 0;
            // let _bombCount: number = 0;
            for (var i in valueArrObj) {
                var _item = valueArrObj[i];
                var _len = _item.length;
                // if (_len === 4)++_bombCount;
                // else 
                if (_len === 3)
                    ++_threeCount;
                else if (_len === 2)
                    ++_twoCount;
            }
            // if (_bombCount * 2 === _threeCount) resObj["isOK"] = true;
            // else 
            if (_twoCount === _threeCount && _threeCount != 0)
                resObj["isOK"] = true;
            //======== 三飞带对可带炸弹 end ===============
        }
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isFour_Order_TwoSingle = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        var len = cardList.length;
        if (cardList.length >= 12 && cardList.length % 6 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            var count = RuleChecker.getValueOrderCount(valueArrObj, 4);
            if (count * 6 == len) {
                resObj["isOK"] = true;
            }
            else {
                for (var i = count - 1; i > 1; i--) {
                    if (i * 6 == len) {
                        resObj["isOK"] = true;
                    }
                }
            }
        }
        if (!resObj["isOK"] && resObj["speSerialArr"].length != 0)
            resObj["isOK"] = true;
        return resObj;
    };
    RuleChecker.isThree = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length == 3) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var objKeysArr = Object.keys(valueArrObj);
            if (objKeysArr.length == 1) {
                resObj["isOK"] = true;
            }
        }
        return resObj;
    };
    RuleChecker.isThree_One = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length != 4)
            return false;
        var valueArrObj = RuleChecker.getCardValueArray(cardList);
        var objKeysArr = Object.keys(valueArrObj);
        if (objKeysArr.length == 2) {
            objKeysArr.forEach(function (item) {
                if (valueArrObj[item].length == 3) {
                    resObj["isOK"] = true;
                }
            });
        }
        return resObj;
    };
    RuleChecker.isThree_Pair = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        if (cardList.length != 5)
            return resObj;
        var valueArrObj = RuleChecker.getCardValueArray(cardList);
        var objKeysArr = Object.keys(valueArrObj);
        if (objKeysArr.length == 2) {
            var threeArr_1 = [], twoArr_1 = [];
            objKeysArr.forEach(function (item) {
                if (valueArrObj[item].length == 3) {
                    threeArr_1 = valueArrObj[item];
                }
                if (valueArrObj[item].length == 2) {
                    twoArr_1 = valueArrObj[item];
                }
            });
            if (threeArr_1.length != 0 && twoArr_1.length != 0 && !this.hasJoker(twoArr_1))
                resObj["isOK"] = true;
        }
        return resObj;
    };
    RuleChecker.isBomb = function (cardList) {
        var valueObj = RuleChecker.getCardValueArray(cardList);
        if (cardList.length != 4)
            return false;
        if (valueObj[RuleChecker.getCardValue(cardList[0])].length == 4)
            return true;
    };
    RuleChecker.isRocket = function (cardList) {
        if (cardList.length == 2) {
            if ((RuleChecker.getCardValue(cardList[0]) == 16 && RuleChecker.getCardValue(cardList[1]) == 17) || (RuleChecker.getCardValue(cardList[0]) == 17 && RuleChecker.getCardValue(cardList[1]) == 16)) {
                return true;
            }
        }
        return false;
    };
    RuleChecker.isFour_TwoSingle = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        resObj["speSerialArr"] = [];
        // if (cardList.length != 6 || RuleChecker.hasSpecialCard(cardList) > 1) {
        if (cardList.length != 6) {
            return false;
        }
        var cardList1 = new Array();
        cardList1 = __spreadArrays(cardList);
        var valueList = RuleChecker.getCardValueArray(cardList1);
        if (RuleChecker.getValueMax(valueList, 4)) {
            for (var i in valueList) {
                if (valueList[i].length == 4) {
                    delete valueList[RuleChecker.getCardValue(valueList[i][0])];
                    break;
                }
            }
            var arrArr = this.getArrArr(valueList);
            if (arrArr.length == 1 && arrArr[0].length == 2) { //带对子
                var value = RuleChecker.getCardValue(arrArr[0][0]);
                if (value != 16 && value != 17) {
                    resObj["isOK"] = true;
                }
            }
            else if (arrArr.length == 2) { //带两单
                resObj["isOK"] = true;
            }
        }
        return resObj;
    };
    RuleChecker.isFour_TwoPair = function (cardList) {
        var resObj = {};
        resObj["isOK"] = false;
        if (cardList.length != 8 || this.hasJoker(cardList)) {
            return resObj;
        }
        var valueList;
        var cardList1 = new Array();
        cardList1 = __spreadArrays(cardList);
        valueList = RuleChecker.getCardValueArray(cardList1);
        //======== 两个炸弹也能出 begin ===========
        /*  let _isTwoBomb: boolean = true;
         for (let key in valueList) {
             let _item = valueList[key];
             if (_item.length != 4) _isTwoBomb = false;
         }
         if (_isTwoBomb) {
             resObj["isOK"] = true;
             return resObj
         } */
        //======== 两个炸弹也能出 end ===========
        if (RuleChecker.getValueMax(valueList, 4)) {
            for (var i in valueList) {
                if (valueList[i].length == 4) {
                    delete valueList[RuleChecker.getCardValue(valueList[i][0])];
                    break;
                }
            }
            var arrArr = this.getArrArr(valueList);
            if (arrArr.length == 2 && arrArr[0].length == 2 && arrArr[1].length == 2) {
                var value = RuleChecker.getCardValue(arrArr[0][0]);
                if (value != 16 && value != 17) {
                    resObj["isOK"] = true;
                }
            }
        }
        return resObj;
    };
    /**获取cardList<serialNo> */
    RuleChecker.getCardListFromValueArrObj = function (valueArrObj) {
        var resArr = [];
        for (var i in valueArrObj) {
            resArr = resArr.concat(valueArrObj[i]);
        }
        return resArr;
    };
    /**
     * 获取对应数量的牌的数组的数组
     */
    RuleChecker.getArrayofNum = function (valueList, cardNum) {
        var resArr = [];
        for (var item in valueList) {
            if (valueList[item].length == cardNum) {
                resArr.push(valueList[item]);
            }
        }
        return resArr;
    };
    RuleChecker.getValueArrOfNum = function (valueList, cardNum) {
        var arr = RuleChecker.getArrayofNum(valueList, cardNum);
        var resArr = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            resArr.push(RuleChecker.getCardValue(i[0]));
        }
        return resArr;
    };
    RuleChecker.getCountofArrNum = function (valueList, cardNum) {
        var res = 0;
        for (var item in valueList) {
            if (valueList[item].length == cardNum) {
                res++;
            }
        }
        return res;
    };
    /**
     * 获取对应数量的值的key值的数组
     */
    RuleChecker.getIndexArrayOfNum = function (valueList, cardNum) {
        var indexArr = new Array();
        for (var i in valueList) {
            if (valueList[i].length == cardNum) {
                indexArr.push(i);
            }
        }
        return indexArr;
    };
    /**
     * 获取非空valueList，并取值的数组
     */
    RuleChecker.getPureValueArr = function (valueList) {
        var arrValueList = new Array();
        var arrPureValueList = new Array();
        for (var i in valueList) {
            if (valueList[i] != null) {
                arrValueList.push(valueList[i]);
            }
        }
        for (var k = 0, len = arrValueList.length; k < len; k++) {
            arrPureValueList.push(RuleChecker.getCardValue(arrValueList[k][0]));
        }
        return arrPureValueList;
    };
    /**获取对应数量的牌的最大值*/
    RuleChecker.getCardMaxValue = function (cardList, cardNum) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var maxValue = 99;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == cardNum) {
                if (this.getCardValue(itemList[0]) > maxValue || maxValue == 99) {
                    maxValue = this.getCardValue(itemList[0]);
                }
            }
        }
        return maxValue;
    };
    /**获取对应数量的牌的最大值的serialNo*/
    RuleChecker.getCardMaxSerialNo = function (cardList, cardNum) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var maxSerialNo = 999;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == cardNum) {
                if (itemList[0] > maxSerialNo || maxSerialNo == 999) {
                    // maxSerialNo = this.getCardValue(itemList[0]);
                    maxSerialNo = itemList[0];
                }
            }
        }
        return maxSerialNo;
    };
    RuleChecker.getValueCount = function (valueList, cardNum) {
        var count = 0;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == cardNum) {
                count++;
            }
        }
        return count;
    };
    RuleChecker.getValueMaxAndMin = function (valueList, maxNum, minNum) {
        var maxFlags = false;
        var minFlags = false;
        for (var i = 0; i < valueList.length; i++) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length == maxNum) {
                    maxFlags = true;
                }
                else if (itemList != null && itemList.length == minNum) {
                    minFlags = true;
                }
            }
        }
        return maxFlags && minFlags;
    };
    /**
     * 检测是否包含对应长度的同值牌
     *  */
    RuleChecker.getValueMax = function (valueList, maxNum) {
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == maxNum) {
                return true;
            }
        }
        return false;
    };
    /**从选牌中提出顺子 */
    RuleChecker.getOrderFromSelected = function (serialArr) {
        var resArr = [];
        var valueObj = RuleChecker.getCardValueArray(serialArr);
        var valueArr = [];
        for (var i in valueObj) {
            valueArr.push(parseInt(i));
        }
        var lastValue = -1;
        var orderValueArr = [];
        for (var j = 0, len = valueArr.length; j < len; j++) {
            if (lastValue == -1) {
                lastValue = valueArr[j];
                orderValueArr.push(valueArr[j]);
            }
            else {
                if (lastValue + 1 != valueArr[j] && orderValueArr.length < 3) {
                    orderValueArr.length = 0;
                    lastValue = valueArr[j];
                    orderValueArr.push(valueArr[j]);
                }
                else if (lastValue + 1 == valueArr[j]) {
                    orderValueArr.push(valueArr[j]);
                    lastValue = valueArr[j];
                }
            }
        }
        //排除2和王
        for (var i = 0, len = orderValueArr.length; i < len; i++) {
            if (orderValueArr[i] >= 16 || orderValueArr[i] == 15) {
                orderValueArr.splice(i, 1);
                i--;
            }
        }
        if (orderValueArr.length >= 3) {
            for (var k = 0, len = orderValueArr.length; k < len; k++) {
                resArr.push(valueObj[orderValueArr[k]][0]);
            }
        }
        return resArr;
    };
    /**连牌数量 */
    RuleChecker.getValueOrderCount = function (valueList, cardNum) {
        var count = 0;
        var oldCardValue = 0;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length >= cardNum) {
                if (count == 0) {
                    oldCardValue = Number(i);
                    count++;
                }
                else {
                    if (this.hasJoker(itemList) || this.getCardValue(itemList[0]) == 15)
                        break;
                    if (oldCardValue + 1 == Number(i)) {
                        oldCardValue = Number(i);
                        count++;
                    }
                    // 三（四）飞机带三张（两对）不带癞子牌的飞机带单判断
                    else if (count == 1) {
                        oldCardValue = Number(i);
                        // count = 1;
                    }
                    else {
                        break;
                    }
                    //
                }
            }
        }
        return count;
    };
    /**已确定牌型后，飞机主牌值确定 */
    RuleChecker.getMainValueOfPlane = function (cardList, cardNum) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var count = 0;
        var oldCardValue = 0;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == cardNum) {
                if (count == 0) {
                    oldCardValue = Number(i);
                    count++;
                }
                else {
                    if (this.hasJoker(itemList) || this.getCardValue(itemList[0]) == 15)
                        break;
                    if (oldCardValue + 1 == Number(i)) {
                        oldCardValue = Number(i);
                        count++;
                    }
                    // 三（四）飞机带三张（两对）不带癞子牌的飞机带单判断
                    else if (count == 1) {
                        oldCardValue = Number(i);
                        // count = 1;
                    }
                    else {
                        break;
                    }
                    //
                }
            }
        }
        return oldCardValue;
    };
    //牌组转换成字符串
    RuleChecker.getStrbyCardsList = function (cardList) {
        var resStr = "";
        if (cardList.length != 0) {
            if (cardList[0] != null) {
                for (var i = 0, len = cardList.length; i < len; i++) {
                    var str = cardList[i]['serialNo'].toString();
                    resStr += str + ",";
                }
            }
        }
        var res = resStr.slice(0, resStr.length - 1);
        return res;
    };
    /**获取value对应的serialNo数组 */
    RuleChecker.getCardValueArray = function (cardList) {
        var res = {};
        cardList.forEach(function (item) {
            var value = RuleChecker.getCardValue(item);
            if (value != 0) {
                if (res[value] == null) {
                    res[value] = [item];
                }
                else {
                    res[value].push(item);
                }
            }
        });
        return res;
    };
    /**深拷贝对象 */
    RuleChecker.getCopyObj = function (obj1, obj2) {
        if (obj2 === void 0) { obj2 = {}; }
        // let keysArr = Object.keys(obj1);
        for (var objItem in obj1) {
            // if(obj1.hasOwnProperty(objItem)){
            if (typeof obj1[objItem] === "object") {
                obj2[objItem] = (obj1[objItem].constructor === Array) ? [] : {};
                if (obj1[objItem])
                    RuleChecker.getCopyObj(obj1[objItem], obj2[objItem]);
            }
            else {
                obj2[objItem] = obj1[objItem];
            }
            // };
        }
        return obj2;
    };
    RuleChecker.getCardListFromValueArr = function (valueArr1) {
        var valueArr = this.getCopyObj(valueArr1);
        var resArr = [];
        for (var i in valueArr) {
            var len = valueArr[i].length;
            if (len >= 3) {
                for (var j = 0; j < len; j++) {
                    resArr.push(valueArr[i][j]);
                }
                delete valueArr[i];
            }
        }
        // resArr = resArr.sort((a, b) => { return b - a });
        for (var i in valueArr) {
            var len = valueArr[i].length;
            for (var j = 0; j < len; j++) {
                resArr.push(valueArr[i][j]);
            }
        }
        return resArr;
    };
    RuleChecker.getCardValueObj = function (cardList) {
        var res = {};
        cardList.forEach(function (item) {
            if (res[item] == null)
                res[item] = 1;
            else
                res[item]++;
        });
        return res;
    };
    /**order牌型排序*/
    RuleChecker.getNormalOrder = function (cardList) {
        var valueListForRes = RuleChecker.getCardValueArray(cardList);
        var resArr = new Array();
        var resArr1 = new Array();
        var resArr2 = new Array();
        for (var i in valueListForRes) {
            if (valueListForRes[i].length >= 3) {
                if (resArr1.length == 0) {
                    // resArr1 = RuleChecker.getStrbyCardsList(valueListForRes[i]).split(",");
                    resArr1 = valueListForRes[i];
                }
                else {
                    // let tempArr: Array<number> = RuleChecker.getStrbyCardsList(valueListForRes[i]).split(",")
                    var tempArr = valueListForRes[i];
                    resArr1 = resArr1.concat(tempArr);
                }
            }
            else {
                if (resArr2.length == 0) {
                    // resArr2 = RuleChecker.getStrbyCardsList(valueListForRes[i]).split(",");
                    resArr2 = valueListForRes[i];
                }
                else {
                    // let tempArr: Array<number> = RuleChecker.getStrbyCardsList(valueListForRes[i]).split(",")
                    var tempArr = valueListForRes[i];
                    resArr2 = resArr2.concat(tempArr);
                }
            }
        }
        /* if (resArr1.length == 2 && resArr2.length == 4) {
             resArr = resArr2.concat(resArr1);
             return resArr;
         }*/
        resArr = resArr1.concat(resArr2);
        return resArr;
    };
    RuleChecker.shiftNeedlessCardsForPureThreeFly = function (valueList, cardNum) {
        if (cardNum === void 0) { cardNum = 3; }
        var count = 0;
        var oldCardValue = 0;
        var valueListRes = new Array();
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length >= cardNum) { //炸弹可做飞机
                    valueListRes.push(itemList.slice(0, cardNum));
                }
            }
        }
        for (var i = 0; i < valueListRes.length; i++) {
            if (i == 0) {
                if (RuleChecker.getCardValue(valueListRes[i][0]) + 1 != RuleChecker.getCardValue(valueListRes[i + 1][0])) {
                    valueListRes.splice(i, 1);
                }
            }
            else if (i == valueListRes.length - 1) {
                if (RuleChecker.getCardValue(valueListRes[i][0]) - 1 != RuleChecker.getCardValue(valueListRes[i - 1][0])) {
                    valueListRes.splice(i, 1);
                }
            }
        }
        var res = [];
        for (var j = 0, len = valueListRes.length; j < len; j++) {
            var tempItem = valueListRes[j];
            tempItem.forEach(function (item) {
                res.push(item);
            });
        }
        return res;
    };
    RuleChecker.shiftNeedlessCardsForPureThree = function (valueList, cardNum) {
        if (cardNum === void 0) { cardNum = 3; }
        var valueListRes = new Array();
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                // if (itemList != null && itemList.length >= cardNum) {//炸弹可做飞机
                if (itemList != null && itemList.length >= cardNum) {
                    valueListRes = itemList.slice(0, cardNum);
                }
            }
        }
        return valueListRes;
    };
    RuleChecker.shiftNeedlessCardsForPureFour = function (valueList, cardNum) {
        if (cardNum === void 0) { cardNum = 4; }
        var valueListRes = new Array();
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                // if (itemList != null && itemList.length >= cardNum) {//炸弹可做飞机
                if (itemList != null && itemList.length >= cardNum) {
                    valueListRes = itemList.slice(0, cardNum);
                }
            }
        }
        return valueListRes;
    };
    /**带牌类型去带牌 */
    RuleChecker.getAllWithTypePureArr = function (cardsArr, type) {
        var valueList = RuleChecker.getCardValueArray(cardsArr);
        var resArr = [];
        switch (type) {
            case CardType.CT_THREE_TAKE_ONE:
            case CardType.CT_THREE_TAKE_TWO:
                resArr = RuleChecker.shiftNeedlessCardsForPureThree(valueList);
                break;
            case CardType.CT_FOUR_TAKE_ONE:
            case CardType.CT_FOUR_TAKE_TWO:
                resArr = RuleChecker.shiftNeedlessCardsForPureFour(valueList);
                break;
            case CardType.CT_THREE_LINE:
                resArr = RuleChecker.shiftNeedlessCardsForPureThreeFly(valueList);
                break;
            // case CardType.DealCardType_SI_FEI_JI_DAI_ER:
            //     resArr = RuleChecker.shiftNeedlessCardsForPureThreeFly(valueList, 4);
            //     break;
        }
        return resArr;
    };
    /**将字符串数组转换成数字数组 */
    RuleChecker.getNumberArray = function (str) {
        var resArr = [];
        if (str == "")
            return resArr;
        var arr = str.split(",");
        for (var i = 0; i < arr.length; i++) {
            resArr.push(Number(arr[i]));
        }
        return resArr;
    };
    /**get valueArr 对象中数组个数*/
    RuleChecker.getArrCount = function (arrObj) {
        var resNum = 0;
        for (var i in arrObj) {
            resNum++;
        }
        return resNum;
    };
    /**get valueArr 对象中数组的数组*/
    RuleChecker.getArrArr = function (arrObj) {
        var resArr = [];
        for (var i in arrObj) {
            resArr.push(arrObj[i]);
        }
        return resArr;
    };
    /**是否包含大小王 */
    RuleChecker.hasJoker = function (cardList) {
        for (var i = 0; i < cardList.length; i++) {
            if (RuleChecker.getCardValue(cardList[0]) >= 16)
                return true;
        }
        return false;
    };
    /**
    * 提示选择出牌
    * @returns 牌的数组
    * @param cardList 当前玩家的手牌数组
    * @param pcardList 上一次帮助选择出来的牌
    * @param cardsType 上一次(上家)的出牌类型
    * @param preCardList 上家的出牌
    */
    RuleChecker.HelpCard = function (cardList, pcardList, cardsType) {
        if (!pcardList || pcardList.length == 0) {
            return [];
        }
        var cardListAr = __spreadArrays(cardList);
        var pcardListAr = __spreadArrays(pcardList);
        var valueArr = this.getCardValueArray(cardListAr);
        var valueArr1 = this.getCopyObj(valueArr);
        var resultList = [];
        if (cardsType == CardType.CT_BOMB_CARD) {
            resultList = RuleChecker.findBiggerBomb(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_FOUR_TAKE_ONE) {
            resultList = RuleChecker.findFour_Pair(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_FOUR_TAKE_TWO) {
            resultList = RuleChecker.findFour_Two_Pair(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_THREE_TAKE_TWO) {
            resultList = RuleChecker.findThree_Pair(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_THREE_TAKE_ONE) {
            resultList = RuleChecker.findThreeOne(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_THREE) {
            resultList = RuleChecker.findThree(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_DOUBLE_LINE) {
            resultList = RuleChecker.findOrderCard(cardListAr, valueArr, pcardListAr, 2);
        }
        else if (cardsType == CardType.CT_SINGLE_LINE) {
            resultList = RuleChecker.findOrderCard(cardListAr, valueArr, pcardListAr, 1);
        }
        else if (cardsType == CardType.CT_SINGLE) {
            resultList = RuleChecker.findSingleCard(valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_DOUBLE) {
            resultList = RuleChecker.findPairCard(cardListAr, valueArr, pcardListAr);
        }
        else if (cardsType == CardType.CT_THREE_LINE) {
            if (RuleChecker.isThree_Order(pcardList)["isOK"]) {
                resultList = RuleChecker.findThreeOrderFly(cardListAr, valueArr, pcardListAr, 0, 3);
            }
            ;
            if (RuleChecker.isThree_Order_Take_One(pcardList)["isOK"]) {
                resultList = RuleChecker.findThreeOrderFly(cardListAr, valueArr, pcardListAr, 1, 3);
            }
            ;
            if (RuleChecker.isThree_Order_Take_Pair(pcardList)["isOK"]) {
                resultList = RuleChecker.findThreeOrderFly(cardListAr, valueArr, pcardListAr, 2, 3);
            }
            ;
        }
        if (resultList.length > 0) {
            return resultList;
        }
        else if (cardsType != CardType.CT_BOMB_CARD && !RuleChecker.CheckCardType(pcardList, CardType.CT_BOMB_CARD)[CardType.CT_BOMB_CARD]) {
            var result = RuleChecker.findBomb(cardListAr, valueArr1);
            if (result.length != 0) {
                return result;
            }
        }
        else if (RuleChecker.CheckCardType(pcardList, CardType.CT_BOMB_CARD)[CardType.CT_BOMB_CARD]) {
            var result = RuleChecker.findBiggerBomb(cardListAr, valueArr1, pcardList);
            if (result.length != 0) {
                return result;
            }
        }
        if (resultList.length == 0) {
            var result = RuleChecker.findRocket(cardListAr, valueArr1);
            if (result.length != 0)
                return result;
        }
        return resultList;
    };
    RuleChecker.findBiggerBomb = function (cardList, valueList, pcardList) {
        var result = new Array();
        var cardNum = 4;
        var value = RuleChecker.getCardMinValue(pcardList, cardNum);
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length == cardNum) {
                    var tempValue = this.getCardValue(itemList[0]);
                    if (tempValue > value) {
                        result = itemList.slice(0, itemList.length);
                        break;
                    }
                }
            }
        }
        return result;
    };
    /**查找炸弹 */
    RuleChecker.findBomb = function (cardList, valueList) {
        var result = new Array();
        var valueList1 = RuleChecker.getCopyObj(valueList);
        var cardNum = 4;
        var cardList1 = new Array();
        cardList1 = cardList1.concat(cardList);
        for (var i in valueList1) {
            if (valueList1[i] != null) {
                var itemList = valueList1[i];
                if (itemList != null && itemList.length == cardNum) {
                    result = itemList.slice(0, itemList.length);
                    break;
                }
            }
        }
        return result;
    };
    RuleChecker.findRocket = function (cardList, valueList) {
        var result = new Array();
        var valueList1 = RuleChecker.getCopyObj(valueList);
        var cardList1 = new Array();
        cardList1 = cardList1.concat(cardList);
        for (var i in valueList1) {
            if (valueList1[i] != null) {
                var itemList = valueList1[i];
                if (itemList != null && (itemList[0] == 0x4e || itemList[0] == 0x4f)) {
                    result.push(itemList[0]);
                    if (result.length == 2)
                        break;
                    // break;
                }
            }
        }
        if (result.length != 2)
            return [];
        return result;
    };
    /**查找四带二 */
    RuleChecker.findFour_Pair = function (cardList, valueList, pcardList) {
        var result = new Array();
        if (cardList.length < 6) {
            return result;
        }
        var value = RuleChecker.getCardMinValue(pcardList, 4);
        var cardList1 = __spreadArrays(cardList);
        var valueList1 = new Object();
        valueList1 = RuleChecker.getCardValueArray(cardList1);
        for (var i in valueList1) {
            var itemList = valueList1[i];
            var tempValue = this.getCardValue(itemList[0]);
            if (itemList != null && itemList.length == 4 && tempValue > value) {
                result = result.concat(itemList);
                delete valueList1[i];
                break;
            }
        }
        if (result.length >= 4) {
            var indexArr = new Array();
            for (var i = 1; i < 4; i++) {
                indexArr.push(RuleChecker.getIndexArrayOfNum(valueList1, i));
            }
            for (var i = 0; i < indexArr.length; i++) {
                var numIndexArr = indexArr[i];
                if (numIndexArr.length != 0) {
                    //优先从数量最少的牌值中抽取作为带牌
                    for (var j = 0; j < numIndexArr.length; j++) {
                        for (var k = 0; k < valueList1[numIndexArr[j]].length; k++) {
                            if (valueList1[numIndexArr[j]][k] <= 0x4f) {
                                result.push(valueList1[numIndexArr[j]][k]);
                                if (result.length == 6) {
                                    if (RuleChecker.isCardGreater(result, pcardList, CardType.CT_FOUR_TAKE_ONE)) {
                                        return result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    /**查找四带两对 */
    RuleChecker.findFour_Two_Pair = function (cardList, valueList, pcardList) {
        var result = new Array();
        if (cardList.length < 8) {
            return result;
        }
        var value = RuleChecker.getCardMinValue(pcardList, 4);
        var cardList1 = __spreadArrays(cardList);
        var valueList1 = new Object();
        valueList1 = RuleChecker.getCardValueArray(cardList1);
        for (var i in valueList1) {
            var itemList = valueList1[i];
            var tempValue = this.getCardValue(itemList[0]);
            if (itemList != null && itemList.length == 4 && tempValue > value) {
                result = result.concat(itemList);
                delete valueList1[i];
                break;
            }
        }
        if (result.length >= 4) {
            var indexArr = new Array();
            // for (let i = 1; i < 4; i++) {
            indexArr.push(RuleChecker.getIndexArrayOfNum(valueList1, 2));
            // }
            for (var i = 0; i < indexArr.length; i++) {
                var numIndexArr = indexArr[i];
                if (numIndexArr.length != 0) {
                    //优先从数量最少的牌值中抽取作为带牌
                    for (var j = 0; j < numIndexArr.length; j++) {
                        for (var k = 0; k < valueList1[numIndexArr[j]].length; k++) {
                            if (valueList1[numIndexArr[j]][k] <= 0x4f) {
                                result.push(valueList1[numIndexArr[j]][k]);
                                if (result.length == 8) {
                                    if (RuleChecker.isCardGreater(result, pcardList, CardType.CT_FOUR_TAKE_TWO)) {
                                        return result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    RuleChecker.findThree_Pair = function (cardList1, valueList1, pcardList) {
        var cardList = __spreadArrays(cardList1);
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = new Array();
        var value = RuleChecker.getCardMinValue(pcardList, 3); //上家牌大小
        var myValue = -1;
        var numOrderArr = RuleChecker.getNumOrderArr(valueList, 3);
        for (var i = 0; i < numOrderArr.length; i++) {
            var sameNumArr = numOrderArr[i];
            for (var _i = 0, sameNumArr_1 = sameNumArr; _i < sameNumArr_1.length; _i++) {
                var item = sameNumArr_1[_i];
                var itemList = valueList[item];
                if (itemList != null && itemList.length >= 3) {
                    myValue = RuleChecker.getCardValue(itemList[0]);
                    if (myValue > value) {
                        result = result.concat(itemList.splice(0, 3));
                        delete valueList[item];
                        // result = result.concat(itemList.slice(0, 3));
                        break;
                    }
                }
            }
        }
        if (result.length != 0) {
            var indexArrArr = RuleChecker.getNumOrderArr(valueList, 2);
            for (var i = 0; i < indexArrArr.length; i++) {
                var numIndexArr = indexArrArr[i];
                for (var j = 0; j < numIndexArr.length; j++) {
                    for (var k = 0; k < valueList[numIndexArr[j]].length; k++) {
                        if (valueList[numIndexArr[j]][k] <= 0x4f) {
                            result.push(valueList[numIndexArr[j]][k]);
                            if (result.length == 5) {
                                if (RuleChecker.isCardGreater(result, pcardList, CardType.CT_THREE_TAKE_TWO)) {
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    RuleChecker.findThreeOne = function (cardList1, valueList1, pcardList) {
        var cardList = __spreadArrays(cardList1);
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = new Array();
        var value = RuleChecker.getCardMinValue(pcardList, 3); //上家牌大小
        var myValue = -1;
        var numOrderArr = RuleChecker.getNumOrderArr(valueList, 3);
        for (var i = 0; i < numOrderArr.length; i++) {
            var sameNumArr = numOrderArr[i];
            for (var _i = 0, sameNumArr_2 = sameNumArr; _i < sameNumArr_2.length; _i++) {
                var item = sameNumArr_2[_i];
                var itemList = valueList[item];
                if (itemList != null && itemList.length >= 3) {
                    myValue = RuleChecker.getCardValue(itemList[0]);
                    if (myValue > value) {
                        result = result.concat(itemList.splice(0, 3));
                        delete valueList[item];
                        // result = result.concat(itemList.slice(0, 3));
                        break;
                    }
                }
            }
        }
        if (result.length != 0) {
            var indexArrArr = RuleChecker.getNumOrderArr(valueList, 1);
            for (var i = 0; i < indexArrArr.length; i++) {
                var numIndexArr = indexArrArr[i];
                for (var j = 0; j < numIndexArr.length; j++) {
                    for (var k = 0; k < valueList[numIndexArr[j]].length; k++) {
                        //排除炸弹情况,炸弹类型单独处理
                        if (valueList[numIndexArr[j]][k] <= 0x4f) {
                            result.push(valueList[numIndexArr[j]][k]);
                            if (result.length == 4) {
                                if (RuleChecker.isCardGreater(result, pcardList, CardType.CT_THREE_TAKE_ONE)) {
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    RuleChecker.findThree = function (cardList1, valueList1, pcardList) {
        var cardList = __spreadArrays(cardList1);
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = new Array();
        var value = RuleChecker.getCardMinValue(pcardList, 3); //上家牌大小
        var myValue = -1;
        var numOrderArr = RuleChecker.getNumOrderArr(valueList, 3);
        for (var i = 0; i < numOrderArr.length; i++) {
            var sameNumArr = numOrderArr[i];
            for (var _i = 0, sameNumArr_3 = sameNumArr; _i < sameNumArr_3.length; _i++) {
                var item = sameNumArr_3[_i];
                var itemList = valueList[item];
                if (itemList != null && itemList.length >= 3) {
                    myValue = RuleChecker.getCardValue(itemList[0]);
                    if (myValue > value) {
                        result = result.concat(itemList.slice(0, 3));
                        delete valueList[item];
                        // result = result.concat(itemList.splice(0, 3));
                        break;
                    }
                }
            }
        }
        if (result.length == 3) {
            if (RuleChecker.isCardGreater(result, pcardList, CardType.CT_THREE)) {
                return result;
            }
        }
        return result;
    };
    RuleChecker.findOrderCard = function (cardList1, valueList1, pcardList, cardNum) {
        var count = 0;
        var oldCardValue = 0;
        var result = new Array();
        var value = -1;
        var cardList = __spreadArrays(cardList1);
        var maybeRes = new Array();
        if (RuleChecker.getCardMaxValue(pcardList, cardNum) == 14) {
            return result;
        }
        var valueList = RuleChecker.getCopyObj(valueList1);
        value = RuleChecker.getCardMinValue(pcardList, cardNum); //上手牌值
        for (var i in valueList) {
            var itemList = valueList[i];
            var tempValue = RuleChecker.getCardValue(itemList[0]);
            if (tempValue > value && itemList.length >= cardNum && tempValue < 15) {
                if (count == 0) {
                    if (cardNum == 1) {
                        result.push(itemList[0]);
                    }
                    else if (cardNum == 2) {
                        result.push(itemList[0]);
                        result.push(itemList[1]);
                    }
                    else if (cardNum == 3) {
                        result.push(itemList[0]);
                        result.push(itemList[1]);
                        result.push(itemList[2]);
                    }
                    else if (cardNum == 4) {
                        result.push(itemList[0]);
                        result.push(itemList[1]);
                        result.push(itemList[2]);
                        result.push(itemList[3]);
                    }
                    oldCardValue = tempValue;
                    count++;
                }
                else {
                    if (oldCardValue + 1 == tempValue && tempValue != 15) {
                        if (cardNum == 1) {
                            result.push(itemList[0]);
                        }
                        else if (cardNum == 2) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                        }
                        else if (cardNum == 3) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                            result.push(itemList[2]);
                        }
                        else if (cardNum == 4) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                            result.push(itemList[2]);
                            result.push(itemList[3]);
                        }
                        oldCardValue += 1;
                        count++;
                    }
                    else {
                        result.length = 0;
                        oldCardValue = tempValue;
                        if (cardNum == 1) {
                            result.push(itemList[0]);
                        }
                        else if (cardNum == 2) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                        }
                        else if (cardNum == 3) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                            result.push(itemList[2]);
                        }
                        else if (cardNum == 4) {
                            result.push(itemList[0]);
                            result.push(itemList[1]);
                            result.push(itemList[2]);
                            result.push(itemList[3]);
                        }
                    }
                }
                if (result.length == pcardList.length) {
                    return result;
                }
            }
        }
        if (result.length == pcardList.length) {
            return result;
        }
        return [];
    };
    RuleChecker.findSingleCard = function (valueList, pcardList) {
        var result = new Array();
        var value = RuleChecker.getCardMinValue(pcardList, 1);
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length >= 1) {
                var tempValue = RuleChecker.getCardValue(itemList[0]);
                if (tempValue > value) {
                    result.push(itemList[0]);
                    break;
                }
            }
        }
        return result;
    };
    RuleChecker.findPairCard = function (cardList, valueList, pcardList) {
        var result = new Array();
        var value = RuleChecker.getCardMinValue(pcardList, 2);
        var i = 0;
        for (var i_1 in valueList) {
            if (valueList[i_1] != null) {
                var itemList = valueList[i_1];
                if (itemList != null && itemList.length >= 2) {
                    var tempValue = RuleChecker.getCardValue(itemList[0]);
                    if (tempValue > value) {
                        result = itemList.slice(0, 2);
                        break;
                    }
                }
            }
        }
        return result;
    };
    RuleChecker.findThreeOrderFly = function (cardList, valueList1, pcardList, flyNum, cardNum) {
        if (cardNum === void 0) { cardNum = 3; }
        var valueList = RuleChecker.getCopyObj(valueList1);
        var pcardList1 = this.getThreeFlyOneWithoutWings(pcardList);
        var result = RuleChecker.findOrderCard(cardList, valueList, pcardList1, cardNum);
        var threeValueList = RuleChecker.getCardValueArray(result);
        var threeValueArr = RuleChecker.getValueArrOfNum(threeValueList, 3);
        if (result.length > pcardList1.length) {
            valueList = RuleChecker.getCardValueArray(cardList);
        }
        else if (result.length == pcardList1.length && flyNum == 0) { //飞机不带直接返回结果
            return result;
        }
        var count = result.length > pcardList1.length ? (result.length - 1) / cardNum : result.length / cardNum;
        // var i: number = 0;
        if (((result.length + (count * flyNum)) == pcardList.length) || ((result.length + (count * flyNum)) == pcardList.length + 1 && result.length > pcardList1.length)) {
            var index = void 0;
            var itemList1 = void 0;
            var tempCount = -1;
            var resultValueList = RuleChecker.getCardValueArray(result);
            var getPureValueArr = RuleChecker.getPureValueArr(resultValueList);
            var uniqueObj = new Object();
            for (var i = 0; i < getPureValueArr.length; i++) {
                uniqueObj[getPureValueArr[i]] = i.toString();
            }
            for (var item in valueList) {
                if (uniqueObj[RuleChecker.getCardValue(valueList[item][0])] != null) {
                    if (valueList[item].length == 4) {
                        valueList[item].splice(0, 3);
                    }
                    else {
                        delete valueList[item];
                    }
                }
            }
            if (result.length >= 6) {
                var indexArr = new Array();
                for (var j = 1; j < 4; j++) {
                    indexArr.push(RuleChecker.getIndexArrayOfNum(valueList, j));
                }
                for (var k = 0; k < indexArr.length; k++) {
                    var numIndexArr = indexArr[k];
                    if (numIndexArr != null) {
                        for (var l = 0; l < numIndexArr.length; l++) {
                            for (var m = 0; m < valueList[numIndexArr[l]].length; m++) {
                                // if (valueList[numIndexArr[l]][m] <= 53 && threeValueArr.indexOf(RuleChecker.getCardValue(valueList[numIndexArr[l]][m])) == -1) {//不选择可合为炸弹的牌为带牌
                                if (valueList[numIndexArr[l]][m] <= 0x4f) { //不选择可合为炸弹的牌为带牌
                                    if (flyNum == 2 && valueList[numIndexArr[l]].length == 2) { //三带对
                                        result.push(valueList[numIndexArr[l]][m]);
                                    }
                                    else if (flyNum == 1) {
                                        result.push(valueList[numIndexArr[l]][m]);
                                    }
                                }
                                if (result.length == pcardList.length) {
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    RuleChecker.findFourOrderFly = function (cardList, valueList1, pcardList, flyNum, cardNum) {
        if (cardNum === void 0) { cardNum = 4; }
        var valueList = RuleChecker.getCopyObj(valueList1);
        var pcardList1 = this.getFourFlyOneWithoutWings(pcardList);
        var result = RuleChecker.findOrderCard(cardList, valueList, pcardList1, cardNum);
        var threeValueList = RuleChecker.getCardValueArray(result);
        // let threeValueArr = RuleChecker.getValueArrOfNum(threeValueList, 4);
        if (result.length > pcardList1.length) {
            valueList = RuleChecker.getCardValueArray(cardList);
        }
        else if (result.length == pcardList1.length && flyNum == 0) { //飞机不带直接返回结果
            return result;
        }
        var count = result.length > pcardList1.length ? (result.length - 1) / cardNum : result.length / cardNum;
        var i = 0;
        if (((result.length + (count * flyNum)) == pcardList.length) || ((result.length + (count * flyNum)) == pcardList.length + 1 && result.length > pcardList1.length)) {
            var index = void 0;
            var itemList1 = void 0;
            var tempCount = -1;
            var resultValueList = RuleChecker.getCardValueArray(result);
            var getPureValueArr = RuleChecker.getPureValueArr(resultValueList);
            var uniqueObj = new Object();
            for (var i_2 = 0; i_2 < getPureValueArr.length; i_2++) {
                uniqueObj[getPureValueArr[i_2]] = i_2.toString();
            }
            for (var item in valueList) {
                if (uniqueObj[RuleChecker.getCardValue(valueList[item][0])] != null) {
                    if (valueList[item].length == 4) {
                        valueList[item].splice(0, 4);
                    }
                    else {
                        delete valueList[item];
                    }
                }
            }
            if (result.length >= 8) {
                var indexArr = new Array();
                for (var j = 1; j < 4; j++) {
                    indexArr.push(RuleChecker.getIndexArrayOfNum(valueList, j));
                }
                for (var k = 0; k < indexArr.length; k++) {
                    var numIndexArr = indexArr[k];
                    if (numIndexArr != null) {
                        for (var l = 0; l < numIndexArr.length; l++) {
                            for (var m = 0; m < valueList[numIndexArr[l]].length; m++) {
                                // if (valueList[numIndexArr[l]][m] <= 53 && threeValueArr.indexOf(RuleChecker.getCardValue(valueList[numIndexArr[l]][m])) == -1) {//不选择可合为炸弹的牌为带牌
                                if (valueList[numIndexArr[l]][m] <= 0x4f) {
                                    result.push(valueList[numIndexArr[l]][m]);
                                }
                                if (result.length == pcardList.length) {
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        return [];
    };
    /**获取不带翅膀的飞机 */
    RuleChecker.getThreeFlyOneWithoutWings = function (cardList) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var cardListArr;
        var speCardValue;
        var pureThreeFlyValueList;
        var cardListRes = new Array();
        cardListArr = cardList;
        pureThreeFlyValueList = this.shiftNeedlessCardsForPureThreeFly(valueList, 3);
        for (var j = 0, len = pureThreeFlyValueList.length; j < len; j++) {
            // for (let k = 0; k < pureThreeFlyValueList[j].length; k++) {
            // cardListRes.push(pureThreeFlyValueList[j][k]);
            // }
            cardListRes.push(pureThreeFlyValueList[j]);
        }
        return cardListRes;
    };
    /**带牌是否大于上家 (用于带牌必大) */
    RuleChecker.isWingsGreater = function (wing1, wing2) {
        var len1 = wing1.length;
        var len2 = wing2.length;
        if (len1 != len2)
            return;
        var resBoo = true;
        var valueList1 = RuleChecker.getCardValueArray(wing1);
        var valueList2 = RuleChecker.getCardValueArray(wing2);
        var orderArr1 = [];
        for (var i in valueList1) {
            var numArr = valueList1[i];
            numArr.forEach(function (item) {
                orderArr1.push(item);
            });
        }
        var orderArr2 = [];
        for (var j in valueList2) {
            var numArr = valueList2[j];
            numArr.forEach(function (item) {
                orderArr2.push(item);
            });
        }
        for (var k = 0; k < len1; k++) {
            if (RuleChecker.getCardValue(orderArr1[k]) <= RuleChecker.getCardValue(orderArr2[k])) {
                resBoo = false;
            }
        }
        return resBoo;
    };
    /**获取上家带牌
     * @param cardsList {number[]} 需处理的牌组
     * @param count {number} 三飞机或四飞机
    */
    RuleChecker.getPreWings = function (cardsList1, count) {
        var cardsList = __spreadArrays(cardsList1);
        var valueArr = RuleChecker.getCardValueArray(cardsList);
        var resArr = [];
        for (var i in valueArr) {
            var item = valueArr[i];
            if (item.length >= count) {
                item.splice(0, count);
            }
        }
        for (var j in valueArr) {
            var item = valueArr[j];
            for (var k = 0; k < item.length; k++) {
                resArr.push(item[k]);
            }
        }
        return resArr;
    };
    /**从手牌获取带牌及已选手牌
     * @param cardsList {number[]} 需处理的牌组
     * @param count {number} 三飞机或四飞机
    */
    RuleChecker.getHandsWingsWithSelected = function (cardsList1, pcardList, diffArr, count, wingCount, wingType) {
        var cardsList = __spreadArrays(cardsList1);
        var diffArrObj = RuleChecker.getCardValueArray(diffArr);
        var diffArrValueArr = Object.keys(diffArrObj);
        var valueArr = RuleChecker.getCardValueArray(cardsList);
        var resArr = [];
        var wing2 = RuleChecker.getPreWings(pcardList, count);
        var wing2ValueArr = RuleChecker.getCardValueArray(wing2);
        //祛除已选牌
        var selectedCards = [];
        for (var i in valueArr) {
            var item = valueArr[i];
            var itemValueStr = RuleChecker.getCardValue(item[0]).toString();
            if (item.length >= count && diffArrValueArr.indexOf(itemValueStr) != -1) {
                selectedCards.push(item.splice(0, count));
            }
        }
        //获取可带牌
        for (var j in valueArr) {
            var item = valueArr[j];
            for (var k = 0; k < item.length; k++) {
                var val1 = RuleChecker.getCardValue(item[k]);
                for (var l = 0; l < wing2.length; l++) {
                    var val2 = RuleChecker.getCardValue(wing2[l]);
                    if (val1 > val2) {
                        if (wingType == null) {
                            resArr.push(item[k]);
                            wing2.splice(l, 1);
                        }
                        else if (wingType == CardType.CT_DOUBLE && item.length >= 2) {
                            resArr = resArr.concat(item.splice(0, 2));
                        }
                        if (resArr.length == wingCount) {
                            resArr = resArr.concat.apply(resArr, selectedCards);
                            return resArr;
                        }
                        break;
                    }
                }
            }
        }
        return resArr;
    };
    /**获取不带翅膀的四飞机 */
    RuleChecker.getFourFlyOneWithoutWings = function (cardList) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var cardListArr;
        var speCardValue;
        var pureFourFlyValueList;
        var cardListRes = new Array();
        cardListArr = cardList;
        pureFourFlyValueList = this.shiftNeedlessCardsForPureThreeFly(valueList, 4);
        for (var j = 0, len = pureFourFlyValueList.length; j < len; j++) {
            // for (let k = 0; k < pureFourFlyValueList[j].length; k++) {
            //     cardListRes.push(pureFourFlyValueList[j][k]);
            // }
            cardListRes.push(pureFourFlyValueList[j]);
        }
        return cardListRes;
    };
    /**根据牌值数量key值从小到大排序 */
    RuleChecker.getNumOrderArr = function (obj, beginNum) {
        var resArr = [];
        for (var i = beginNum; i < 4; i++) {
            var item = RuleChecker.getIndexArrayOfNum(obj, i);
            if (item.length != 0) {
                resArr.push(item);
            }
        }
        return resArr;
    };
    RuleChecker.getCardMinValue = function (cardList, cardNum) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var minValue = -1;
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length == cardNum) {
                    var value = this.getCardValue(itemList[0]);
                    if (value < minValue || minValue == -1) {
                        minValue = value;
                    }
                }
            }
        }
        return minValue;
    };
    return RuleChecker;
}());
var CardType = /** @class */ (function () {
    function CardType() {
    }
    CardType.CT_ERROR = 0; //错误类型
    CardType.CT_SINGLE = 1; //单牌类型
    CardType.CT_DOUBLE = 2; //对牌类型
    CardType.CT_THREE = 3; //三条类型
    CardType.CT_SINGLE_LINE = 4; //单连类型
    CardType.CT_DOUBLE_LINE = 5; //对连类型
    CardType.CT_THREE_LINE = 6; //三连类型
    CardType.CT_THREE_TAKE_ONE = 7; //三带一单
    CardType.CT_THREE_TAKE_TWO = 8; //三带一对
    CardType.CT_FOUR_TAKE_ONE = 9; //四带两单
    CardType.CT_FOUR_TAKE_TWO = 10; //四带两对
    CardType.CT_BOMB_CARD = 11; //炸弹类型
    CardType.CT_MISSILE_CARD = 12; //火箭类型
    CardType.CHUNTIAN = 13; //春天
    CardType.FANCHUN = 14; //反春
    CardType.TONGTIANSHUN = 15; //通天顺
    CardType.normalTypeArrr = [
        CardType.CT_SINGLE,
        CardType.CT_DOUBLE,
        CardType.CT_DOUBLE_LINE,
        CardType.CT_SINGLE_LINE,
        CardType.CT_THREE,
        // CardType.DealCardType_SAN_FEI_JI_BU_DAI, //三飞机不带
        // CardType.DealCardType_SI_FEI_JI_BU_DAI, //四飞机不带
        CardType.CT_BOMB_CARD,
    ];
    return CardType;
}());

module.exports = {RuleChecker,CardType}
