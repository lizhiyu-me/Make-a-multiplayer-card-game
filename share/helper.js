/**
 * * rJkr for redJoker
 * * bJkr for blackJoker
 */
var cardNameNumberDic = {
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
    'rjkr': 0x0f,
    'bjkr': 0x0e,
    'a': 0x01,
    'k': 0x0d,
    'q': 0x0c,
    'j': 0x0b,
}
/**
 * * rJkr for redJoker
 * * bJkr for blackJoker
 */
var cardNumberNameDic = {
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
function getCardReadableName(cardNumber) {
    let _cardNumber = Number(cardNumber);
    let _value = _cardNumber % 0x10;
    return cardNumberNameDic[_value];
}

function convert2ReadableNames(cardsArr) {
    let _res = [];
    for (let i = 0, len = cardsArr.length; i < len; i++) {
        let _cardNumber = cardsArr[i];
        _res.push(getCardReadableName(_cardNumber));
    }
    return _res;
}
function convert2CardNumbers(cardNames) {
    let _res = [];
    for (let i = 0, len = cardNames.length; i < len; i++) {
        let _cardName = cardNames[i];
        _res.push(cardNameNumberDic[_cardName]);
    }
    return _res;
}

module.exports = { cardNameNumberDic, cardNumberNameDic, getCardReadableName, convert2ReadableNames, convert2CardNumbers }