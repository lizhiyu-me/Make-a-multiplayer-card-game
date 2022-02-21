function generateEnum(protoArr) {
    let _enum = {};
    for (let i = 0; i < protoArr.length; i++) {
        const _protoName = protoArr[i];
        _enum[_enum[_protoName] = i] = _protoName;
    }
    return _enum;
}

const ENUM_CMD_FN = generateEnum(
    [
        "dealCards_S2C",
        "competeForLandLordRole_C2S",
        "playCards_C2S",
        "playCards_S2C",
        "playNotAllowRule_S2C",
        "gameEnd_S2C"
    ]);

module.exports = { ENUM_CMD_FN: ENUM_CMD_FN }