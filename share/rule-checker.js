var RuleChecker = /** @class */ (function () {
    function RuleChecker() {
    }
    RuleChecker.getCardValue = function (cardSerialNo) {
        var resNum = -1;
        cardSerialNo = Number(cardSerialNo);
        resNum = cardSerialNo % 16;
        if (resNum == 14) {
            resNum = 16;
        }
        else if (resNum == 15) {
            resNum = 17;
        }
        else if (resNum == 1) {
            resNum = 14;
        }
        else if (resNum == 2) {
            resNum = 15;
        }
        return resNum;
    };
    RuleChecker.CheckCard = function (cardListArr, pcardListArr, cardsType, handCardsCount) {
        var result = { isOK: false, cardsType: [] };
        var mcardsTypeObj = RuleChecker.CheckCardType(cardListArr, cardsType);
        var cardsTypeArr = Object.keys(mcardsTypeObj);
        cardsTypeArr = this.getNumberArray(cardsTypeArr.join(","));
        if (cardsTypeArr.length == 0)
            return result;
        var mcardsType = cardsTypeArr[0]; 
        if (mcardsType == CardType.CT_MISSILE_CARD || (mcardsType == CardType.CT_BOMB_CARD && cardsType < CardType.CT_BOMB_CARD)) {
            result["isOK"] = true;
            result["cardsType"] = [mcardsType];
            return result;
        }
        if (cardsType == mcardsType || cardsType == -1) {
            if (cardsType == -1 || RuleChecker.isCardGreater(cardListArr, pcardListArr, cardsType)) {
                result["isOK"] = true;
                result["cardsType"] = [mcardsType];
            }
        }
        return result;
    };
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
    RuleChecker.CheckCardType = function (cardList1, cardsType) {
        var cardList = cardList1.slice();
        var resObj = {};
        var tempRes = {};
        if (RuleChecker.isRocket(cardList)) { 
            resObj[CardType.CT_MISSILE_CARD] = true;
            return resObj;
        }
        if (RuleChecker.isBomb(cardList)) { 
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
            var count = RuleChecker.getValueOrderCount(valueArrObj, 3);
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
        if (cardList.length >= 10 && cardList.length % 5 == 0) {
            var valueArrObj = RuleChecker.getCardValueArray(cardList);
            var _threeCount = 0;
            var _twoCount = 0;
            for (var i in valueArrObj) {
                var _item = valueArrObj[i];
                var _len = _item.length;
                if (_len === 3)
                    ++_threeCount;
                else if (_len === 2)
                    ++_twoCount;
            }
            if (_twoCount === _threeCount && _threeCount != 0)
                resObj["isOK"] = true;
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
        if (cardList.length != 6) {
            return false;
        }
        var cardList1 = [];
        cardList1 = cardList.slice();
        var valueList = RuleChecker.getCardValueArray(cardList1);
        if (RuleChecker.getValueMax(valueList, 4)) {
            for (var i in valueList) {
                if (valueList[i].length == 4) {
                    delete valueList[RuleChecker.getCardValue(valueList[i][0])];
                    break;
                }
            }
            var arrArr = this.getArrArr(valueList);
            if (arrArr.length == 1 && arrArr[0].length == 2) { 
                var value = RuleChecker.getCardValue(arrArr[0][0]);
                if (value != 16 && value != 17) {
                    resObj["isOK"] = true;
                }
            }
            else if (arrArr.length == 2) { 
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
        var cardList1 = [];
        cardList1 = cardList.slice();
        valueList = RuleChecker.getCardValueArray(cardList1);
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
    RuleChecker.getCardListFromValueArrObj = function (valueArrObj) {
        var resArr = [];
        for (var i in valueArrObj) {
            resArr = resArr.concat(valueArrObj[i]);
        }
        return resArr;
    };
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
    RuleChecker.getIndexArrayOfNum = function (valueList, cardNum) {
        var indexArr = [];
        for (var i in valueList) {
            if (valueList[i].length == cardNum) {
                indexArr.push(i);
            }
        }
        return indexArr;
    };
    RuleChecker.getPureValueArr = function (valueList) {
        var arrValueList = [];
        var arrPureValueList = [];
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
    RuleChecker.getCardMaxSerialNo = function (cardList, cardNum) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var maxSerialNo = 999;
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == cardNum) {
                if (itemList[0] > maxSerialNo || maxSerialNo == 999) {
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
    RuleChecker.getValueMax = function (valueList, maxNum) {
        for (var i in valueList) {
            var itemList = valueList[i];
            if (itemList != null && itemList.length == maxNum) {
                return true;
            }
        }
        return false;
    };
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
                    else if (count == 1) {
                        oldCardValue = Number(i);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return count;
    };
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
                    else if (count == 1) {
                        oldCardValue = Number(i);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return oldCardValue;
    };
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
    RuleChecker.getCopyObj = function (obj1, obj2) {
        if (obj2 === void 0) { obj2 = {}; }
        for (var objItem in obj1) {
            if (typeof obj1[objItem] === "object") {
                obj2[objItem] = (obj1[objItem].constructor === Array) ? [] : {};
                if (obj1[objItem])
                    RuleChecker.getCopyObj(obj1[objItem], obj2[objItem]);
            }
            else {
                obj2[objItem] = obj1[objItem];
            }
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
    RuleChecker.getNormalOrder = function (cardList) {
        var valueListForRes = RuleChecker.getCardValueArray(cardList);
        var resArr = [];
        var resArr1 = [];
        var resArr2 = [];
        for (var i in valueListForRes) {
            if (valueListForRes[i].length >= 3) {
                if (resArr1.length == 0) {
                    resArr1 = valueListForRes[i];
                }
                else {
                    var tempArr = valueListForRes[i];
                    resArr1 = resArr1.concat(tempArr);
                }
            }
            else {
                if (resArr2.length == 0) {
                    resArr2 = valueListForRes[i];
                }
                else {
                    var tempArr = valueListForRes[i];
                    resArr2 = resArr2.concat(tempArr);
                }
            }
        }
        resArr = resArr1.concat(resArr2);
        return resArr;
    };
    RuleChecker.shiftNeedlessCardsForPureThreeFly = function (valueList, cardNum) {
        if (cardNum === void 0) { cardNum = 3; }
        var valueListRes = [];
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length >= cardNum) { 
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
        var valueListRes = [];
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length >= cardNum) {
                    valueListRes = itemList.slice(0, cardNum);
                }
            }
        }
        return valueListRes;
    };
    RuleChecker.shiftNeedlessCardsForPureFour = function (valueList, cardNum) {
        if (cardNum === void 0) { cardNum = 4; }
        var valueListRes = [];
        for (var i in valueList) {
            if (valueList[i] != null) {
                var itemList = valueList[i];
                if (itemList != null && itemList.length >= cardNum) {
                    valueListRes = itemList.slice(0, cardNum);
                }
            }
        }
        return valueListRes;
    };
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
        }
        return resArr;
    };
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
    RuleChecker.getArrCount = function (arrObj) {
        var resNum = 0;
        for (var i in arrObj) {
            resNum++;
        }
        return resNum;
    };
    RuleChecker.getArrArr = function (arrObj) {
        var resArr = [];
        for (var i in arrObj) {
            resArr.push(arrObj[i]);
        }
        return resArr;
    };
    RuleChecker.hasJoker = function (cardList) {
        for (var i = 0; i < cardList.length; i++) {
            if (RuleChecker.getCardValue(cardList[0]) >= 16)
                return true;
        }
        return false;
    };
    RuleChecker.HelpCard = function (cardList, pcardList, cardsType) {
        if (!pcardList || pcardList.length == 0) {
            return [];
        }
        var cardListAr = cardList.slice();
        var pcardListAr = pcardList.slice();
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
        var result = [];
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
    RuleChecker.findBomb = function (cardList, valueList) {
        var result = [];
        var valueList1 = RuleChecker.getCopyObj(valueList);
        var cardNum = 4;
        var cardList1 = [];
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
        var result = [];
        var valueList1 = RuleChecker.getCopyObj(valueList);
        var cardList1 = [];
        cardList1 = cardList1.concat(cardList);
        for (var i in valueList1) {
            if (valueList1[i] != null) {
                var itemList = valueList1[i];
                if (itemList != null && (itemList[0] == 0x4e || itemList[0] == 0x4f)) {
                    result.push(itemList[0]);
                    if (result.length == 2)
                        break;
                }
            }
        }
        if (result.length != 2)
            return [];
        return result;
    };
    RuleChecker.findFour_Pair = function (cardList, valueList, pcardList) {
        var result = [];
        if (cardList.length < 6) {
            return result;
        }
        var value = RuleChecker.getCardMinValue(pcardList, 4);
        var cardList1 = cardList.slice();
        var valueList1 = {};
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
            var indexArr = [];
            for (var i = 1; i < 4; i++) {
                indexArr.push(RuleChecker.getIndexArrayOfNum(valueList1, i));
            }
            for (var i = 0; i < indexArr.length; i++) {
                var numIndexArr = indexArr[i];
                if (numIndexArr.length != 0) {
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
    RuleChecker.findFour_Two_Pair = function (cardList, valueList, pcardList) {
        var result = [];
        if (cardList.length < 8) {
            return result;
        }
        var value = RuleChecker.getCardMinValue(pcardList, 4);
        var cardList1 = cardList.slice();
        var valueList1 = {};
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
            var indexArr = [];
            indexArr.push(RuleChecker.getIndexArrayOfNum(valueList1, 2));
            for (var i = 0; i < indexArr.length; i++) {
                var numIndexArr = indexArr[i];
                if (numIndexArr.length != 0) {
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
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = [];
        var value = RuleChecker.getCardMinValue(pcardList, 3);
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
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = [];
        var value = RuleChecker.getCardMinValue(pcardList, 3); 
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
        var valueList = RuleChecker.getCopyObj(valueList1);
        if (RuleChecker.getValueCount(valueList, 3) == 0 && RuleChecker.getValueCount(valueList, 4) == 0) {
            return [];
        }
        var result = [];
        var value = RuleChecker.getCardMinValue(pcardList, 3);
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
        var result = [];
        var value = -1;
        if (RuleChecker.getCardMaxValue(pcardList, cardNum) == 14) {
            return result;
        }
        var valueList = RuleChecker.getCopyObj(valueList1);
        value = RuleChecker.getCardMinValue(pcardList, cardNum); 
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
        var result = [];
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
        var result = [];
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
        if (result.length > pcardList1.length) {
            valueList = RuleChecker.getCardValueArray(cardList);
        }
        else if (result.length == pcardList1.length && flyNum == 0) {
            return result;
        }
        var count = result.length > pcardList1.length ? (result.length - 1) / cardNum : result.length / cardNum;
        if (((result.length + (count * flyNum)) == pcardList.length) || ((result.length + (count * flyNum)) == pcardList.length + 1 && result.length > pcardList1.length)) {
            var resultValueList = RuleChecker.getCardValueArray(result);
            var getPureValueArr = RuleChecker.getPureValueArr(resultValueList);
            var uniqueObj = {};
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
                var indexArr = [];
                for (var j = 1; j < 4; j++) {
                    indexArr.push(RuleChecker.getIndexArrayOfNum(valueList, j));
                }
                for (var k = 0; k < indexArr.length; k++) {
                    var numIndexArr = indexArr[k];
                    if (numIndexArr != null) {
                        for (var l = 0; l < numIndexArr.length; l++) {
                            for (var m = 0; m < valueList[numIndexArr[l]].length; m++) {
                                if (valueList[numIndexArr[l]][m] <= 0x4f) { 
                                    if (flyNum == 2 && valueList[numIndexArr[l]].length == 2) { 
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
        if (result.length > pcardList1.length) {
            valueList = RuleChecker.getCardValueArray(cardList);
        }
        else if (result.length == pcardList1.length && flyNum == 0) {
            return result;
        }
        var count = result.length > pcardList1.length ? (result.length - 1) / cardNum : result.length / cardNum;
        if (((result.length + (count * flyNum)) == pcardList.length) || ((result.length + (count * flyNum)) == pcardList.length + 1 && result.length > pcardList1.length)) {
            var resultValueList = RuleChecker.getCardValueArray(result);
            var getPureValueArr = RuleChecker.getPureValueArr(resultValueList);
            var uniqueObj = {};
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
                var indexArr = [];
                for (var j = 1; j < 4; j++) {
                    indexArr.push(RuleChecker.getIndexArrayOfNum(valueList, j));
                }
                for (var k = 0; k < indexArr.length; k++) {
                    var numIndexArr = indexArr[k];
                    if (numIndexArr != null) {
                        for (var l = 0; l < numIndexArr.length; l++) {
                            for (var m = 0; m < valueList[numIndexArr[l]].length; m++) {
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
    RuleChecker.getThreeFlyOneWithoutWings = function (cardList) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var pureThreeFlyValueList;
        var cardListRes = [];
        cardListArr = cardList;
        pureThreeFlyValueList = this.shiftNeedlessCardsForPureThreeFly(valueList, 3);
        for (var j = 0, len = pureThreeFlyValueList.length; j < len; j++) {
            cardListRes.push(pureThreeFlyValueList[j]);
        }
        return cardListRes;
    };
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
    RuleChecker.getPreWings = function (cardsList1, count) {
        var cardsList = cardsList1.slice();
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
    RuleChecker.getHandsWingsWithSelected = function (cardsList1, pcardList, diffArr, count, wingCount, wingType) {
        var cardsList = cardsList1.slice();
        var diffArrObj = RuleChecker.getCardValueArray(diffArr);
        var diffArrValueArr = Object.keys(diffArrObj);
        var valueArr = RuleChecker.getCardValueArray(cardsList);
        var resArr = [];
        var wing2 = RuleChecker.getPreWings(pcardList, count);
        var selectedCards = [];
        for (var i in valueArr) {
            var item = valueArr[i];
            var itemValueStr = RuleChecker.getCardValue(item[0]).toString();
            if (item.length >= count && diffArrValueArr.indexOf(itemValueStr) != -1) {
                selectedCards.push(item.splice(0, count));
            }
        }
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
    RuleChecker.getFourFlyOneWithoutWings = function (cardList) {
        var valueList = RuleChecker.getCardValueArray(cardList);
        var pureFourFlyValueList;
        var cardListRes = [];
        cardListArr = cardList;
        pureFourFlyValueList = this.shiftNeedlessCardsForPureThreeFly(valueList, 4);
        for (var j = 0, len = pureFourFlyValueList.length; j < len; j++) {
            cardListRes.push(pureFourFlyValueList[j]);
        }
        return cardListRes;
    };
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
    CardType.CT_ERROR = 0; 
    CardType.CT_SINGLE = 1; 
    CardType.CT_DOUBLE = 2; 
    CardType.CT_THREE = 3; 
    CardType.CT_SINGLE_LINE = 4; 
    CardType.CT_DOUBLE_LINE = 5; 
    CardType.CT_THREE_LINE = 6; 
    CardType.CT_THREE_TAKE_ONE = 7; 
    CardType.CT_THREE_TAKE_TWO = 8; 
    CardType.CT_FOUR_TAKE_ONE = 9; 
    CardType.CT_FOUR_TAKE_TWO = 10; 
    CardType.CT_BOMB_CARD = 11; 
    CardType.CT_MISSILE_CARD = 12; 
    CardType.CHUNTIAN = 13; 
    CardType.FANCHUN = 14; 
    CardType.TONGTIANSHUN = 15; 
    CardType.normalTypeArrr = [
        CardType.CT_SINGLE,
        CardType.CT_DOUBLE,
        CardType.CT_DOUBLE_LINE,
        CardType.CT_SINGLE_LINE,
        CardType.CT_THREE,
        CardType.CT_BOMB_CARD,
    ];
    return CardType;
}());

module.exports = {RuleChecker,CardType}
