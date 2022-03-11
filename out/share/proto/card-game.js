"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadCastMsgS2C = exports.GameStartS2C = exports.PlayTurnS2C = exports.GameEndS2C = exports.IllegalCardsS2C = exports.PlayCardsS2C = exports.PlayCardsC2S = exports.CompeteForLandLordRoleS2C = exports.CompeteForLandLordRoleC2S = exports.ReadyC2S = exports.DealCardsS2C = exports.MainMessage = exports.cmdToJSON = exports.cmdFromJSON = exports.Cmd = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "";
var Cmd;
(function (Cmd) {
    Cmd[Cmd["NONE"] = 0] = "NONE";
    Cmd[Cmd["READY_C2S"] = 1] = "READY_C2S";
    Cmd[Cmd["DEALCARDS_S2C"] = 2] = "DEALCARDS_S2C";
    Cmd[Cmd["COMPETEFORLANDLORDROLE_C2S"] = 3] = "COMPETEFORLANDLORDROLE_C2S";
    Cmd[Cmd["COMPETEFORLANDLORDROLE_S2C"] = 4] = "COMPETEFORLANDLORDROLE_S2C";
    Cmd[Cmd["PLAYTURN_S2C"] = 5] = "PLAYTURN_S2C";
    Cmd[Cmd["PLAYCARDS_C2S"] = 6] = "PLAYCARDS_C2S";
    Cmd[Cmd["PLAYCARDS_S2C"] = 7] = "PLAYCARDS_S2C";
    Cmd[Cmd["ILLEGALCARDS_S2C"] = 8] = "ILLEGALCARDS_S2C";
    Cmd[Cmd["GAMEEND_S2C"] = 9] = "GAMEEND_S2C";
    Cmd[Cmd["GAMESTART_S2C"] = 10] = "GAMESTART_S2C";
    Cmd[Cmd["BROADCAST_MSG_S2C"] = 11] = "BROADCAST_MSG_S2C";
    Cmd[Cmd["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Cmd = exports.Cmd || (exports.Cmd = {}));
function cmdFromJSON(object) {
    switch (object) {
        case 0:
        case "NONE":
            return Cmd.NONE;
        case 1:
        case "READY_C2S":
            return Cmd.READY_C2S;
        case 2:
        case "DEALCARDS_S2C":
            return Cmd.DEALCARDS_S2C;
        case 3:
        case "COMPETEFORLANDLORDROLE_C2S":
            return Cmd.COMPETEFORLANDLORDROLE_C2S;
        case 4:
        case "COMPETEFORLANDLORDROLE_S2C":
            return Cmd.COMPETEFORLANDLORDROLE_S2C;
        case 5:
        case "PLAYTURN_S2C":
            return Cmd.PLAYTURN_S2C;
        case 6:
        case "PLAYCARDS_C2S":
            return Cmd.PLAYCARDS_C2S;
        case 7:
        case "PLAYCARDS_S2C":
            return Cmd.PLAYCARDS_S2C;
        case 8:
        case "ILLEGALCARDS_S2C":
            return Cmd.ILLEGALCARDS_S2C;
        case 9:
        case "GAMEEND_S2C":
            return Cmd.GAMEEND_S2C;
        case 10:
        case "GAMESTART_S2C":
            return Cmd.GAMESTART_S2C;
        case 11:
        case "BROADCAST_MSG_S2C":
            return Cmd.BROADCAST_MSG_S2C;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Cmd.UNRECOGNIZED;
    }
}
exports.cmdFromJSON = cmdFromJSON;
function cmdToJSON(object) {
    switch (object) {
        case Cmd.NONE:
            return "NONE";
        case Cmd.READY_C2S:
            return "READY_C2S";
        case Cmd.DEALCARDS_S2C:
            return "DEALCARDS_S2C";
        case Cmd.COMPETEFORLANDLORDROLE_C2S:
            return "COMPETEFORLANDLORDROLE_C2S";
        case Cmd.COMPETEFORLANDLORDROLE_S2C:
            return "COMPETEFORLANDLORDROLE_S2C";
        case Cmd.PLAYTURN_S2C:
            return "PLAYTURN_S2C";
        case Cmd.PLAYCARDS_C2S:
            return "PLAYCARDS_C2S";
        case Cmd.PLAYCARDS_S2C:
            return "PLAYCARDS_S2C";
        case Cmd.ILLEGALCARDS_S2C:
            return "ILLEGALCARDS_S2C";
        case Cmd.GAMEEND_S2C:
            return "GAMEEND_S2C";
        case Cmd.GAMESTART_S2C:
            return "GAMESTART_S2C";
        case Cmd.BROADCAST_MSG_S2C:
            return "BROADCAST_MSG_S2C";
        default:
            return "UNKNOWN";
    }
}
exports.cmdToJSON = cmdToJSON;
function createBaseMainMessage() {
    return { cmdId: 0, data: new Uint8Array() };
}
exports.MainMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.cmdId !== 0) {
            writer.uint32(8).uint32(message.cmdId);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMainMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cmdId = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            cmdId: isSet(object.cmdId) ? Number(object.cmdId) : 0,
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.cmdId !== undefined && (obj.cmdId = Math.round(message.cmdId));
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMainMessage();
        message.cmdId = (_a = object.cmdId) !== null && _a !== void 0 ? _a : 0;
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
function createBaseDealCardsS2C() {
    return { cards: [], seatNumber: 0 };
}
exports.DealCardsS2C = {
    encode: function (message, writer) {
        var e_1, _a;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        writer.uint32(10).fork();
        try {
            for (var _b = __values(message.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(v);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        writer.ldelim();
        if (message.seatNumber !== 0) {
            writer.uint32(16).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseDealCardsS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cards.push(reader.uint32());
                        }
                    }
                    else {
                        message.cards.push(reader.uint32());
                    }
                    break;
                case 2:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            cards: Array.isArray(object === null || object === void 0 ? void 0 : object.cards)
                ? object.cards.map(function (e) { return Number(e); })
                : [],
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.cards) {
            obj.cards = message.cards.map(function (e) { return Math.round(e); });
        }
        else {
            obj.cards = [];
        }
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseDealCardsS2C();
        message.cards = ((_a = object.cards) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e; })) || [];
        message.seatNumber = (_b = object.seatNumber) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseReadyC2S() {
    return { seatNumber: 0 };
}
exports.ReadyC2S = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.seatNumber !== 0) {
            writer.uint32(8).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseReadyC2S();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseReadyC2S();
        message.seatNumber = (_a = object.seatNumber) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseCompeteForLandLordRoleC2S() {
    return { score: 0, seatNumber: 0 };
}
exports.CompeteForLandLordRoleC2S = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.score !== 0) {
            writer.uint32(8).uint32(message.score);
        }
        if (message.seatNumber !== 0) {
            writer.uint32(16).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseCompeteForLandLordRoleC2S();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.score = reader.uint32();
                    break;
                case 2:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            score: isSet(object.score) ? Number(object.score) : 0,
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.score !== undefined && (obj.score = Math.round(message.score));
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseCompeteForLandLordRoleC2S();
        message.score = (_a = object.score) !== null && _a !== void 0 ? _a : 0;
        message.seatNumber = (_b = object.seatNumber) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseCompeteForLandLordRoleS2C() {
    return { curMaxScore: 0 };
}
exports.CompeteForLandLordRoleS2C = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.curMaxScore !== 0) {
            writer.uint32(16).uint32(message.curMaxScore);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseCompeteForLandLordRoleS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.curMaxScore = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            curMaxScore: isSet(object.curMaxScore) ? Number(object.curMaxScore) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.curMaxScore !== undefined &&
            (obj.curMaxScore = Math.round(message.curMaxScore));
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseCompeteForLandLordRoleS2C();
        message.curMaxScore = (_a = object.curMaxScore) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBasePlayCardsC2S() {
    return { cards: [], seatNumber: 0 };
}
exports.PlayCardsC2S = {
    encode: function (message, writer) {
        var e_2, _a;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        writer.uint32(10).fork();
        try {
            for (var _b = __values(message.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(v);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        writer.ldelim();
        if (message.seatNumber !== 0) {
            writer.uint32(16).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBasePlayCardsC2S();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cards.push(reader.uint32());
                        }
                    }
                    else {
                        message.cards.push(reader.uint32());
                    }
                    break;
                case 2:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            cards: Array.isArray(object === null || object === void 0 ? void 0 : object.cards)
                ? object.cards.map(function (e) { return Number(e); })
                : [],
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.cards) {
            obj.cards = message.cards.map(function (e) { return Math.round(e); });
        }
        else {
            obj.cards = [];
        }
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBasePlayCardsC2S();
        message.cards = ((_a = object.cards) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e; })) || [];
        message.seatNumber = (_b = object.seatNumber) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBasePlayCardsS2C() {
    return { cards: [], seatNumber: 0 };
}
exports.PlayCardsS2C = {
    encode: function (message, writer) {
        var e_3, _a;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        writer.uint32(10).fork();
        try {
            for (var _b = __values(message.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(v);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        writer.ldelim();
        if (message.seatNumber !== 0) {
            writer.uint32(16).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBasePlayCardsS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cards.push(reader.uint32());
                        }
                    }
                    else {
                        message.cards.push(reader.uint32());
                    }
                    break;
                case 2:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            cards: Array.isArray(object === null || object === void 0 ? void 0 : object.cards)
                ? object.cards.map(function (e) { return Number(e); })
                : [],
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.cards) {
            obj.cards = message.cards.map(function (e) { return Math.round(e); });
        }
        else {
            obj.cards = [];
        }
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBasePlayCardsS2C();
        message.cards = ((_a = object.cards) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e; })) || [];
        message.seatNumber = (_b = object.seatNumber) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseIllegalCardsS2C() {
    return { seatNumber: 0 };
}
exports.IllegalCardsS2C = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.seatNumber !== 0) {
            writer.uint32(8).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseIllegalCardsS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseIllegalCardsS2C();
        message.seatNumber = (_a = object.seatNumber) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseGameEndS2C() {
    return { seatNumber: 0 };
}
exports.GameEndS2C = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.seatNumber !== 0) {
            writer.uint32(8).uint32(message.seatNumber);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseGameEndS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seatNumber = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseGameEndS2C();
        message.seatNumber = (_a = object.seatNumber) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBasePlayTurnS2C() {
    return { seatNumber: 0, handCards: [] };
}
exports.PlayTurnS2C = {
    encode: function (message, writer) {
        var e_4, _a;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.seatNumber !== 0) {
            writer.uint32(8).uint32(message.seatNumber);
        }
        writer.uint32(18).fork();
        try {
            for (var _b = __values(message.handCards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                writer.uint32(v);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        writer.ldelim();
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBasePlayTurnS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seatNumber = reader.uint32();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.handCards.push(reader.uint32());
                        }
                    }
                    else {
                        message.handCards.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
            handCards: Array.isArray(object === null || object === void 0 ? void 0 : object.handCards)
                ? object.handCards.map(function (e) { return Number(e); })
                : [],
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        if (message.handCards) {
            obj.handCards = message.handCards.map(function (e) { return Math.round(e); });
        }
        else {
            obj.handCards = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBasePlayTurnS2C();
        message.seatNumber = (_a = object.seatNumber) !== null && _a !== void 0 ? _a : 0;
        message.handCards = ((_b = object.handCards) === null || _b === void 0 ? void 0 : _b.map(function (e) { return e; })) || [];
        return message;
    },
};
function createBaseGameStartS2C() {
    return { seatNumber: 0, playerId: 0 };
}
exports.GameStartS2C = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.seatNumber !== 0) {
            writer.uint32(8).uint32(message.seatNumber);
        }
        if (message.playerId !== 0) {
            writer.uint32(16).uint32(message.playerId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseGameStartS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seatNumber = reader.uint32();
                    break;
                case 2:
                    message.playerId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
            playerId: isSet(object.playerId) ? Number(object.playerId) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.seatNumber !== undefined &&
            (obj.seatNumber = Math.round(message.seatNumber));
        message.playerId !== undefined &&
            (obj.playerId = Math.round(message.playerId));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseGameStartS2C();
        message.seatNumber = (_a = object.seatNumber) !== null && _a !== void 0 ? _a : 0;
        message.playerId = (_b = object.playerId) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseBroadCastMsgS2C() {
    return { msg: "" };
}
exports.BroadCastMsgS2C = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.msg !== "") {
            writer.uint32(10).string(message.msg);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseBroadCastMsgS2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            msg: isSet(object.msg) ? String(object.msg) : "",
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.msg !== undefined && (obj.msg = message.msg);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseBroadCastMsgS2C();
        message.msg = (_a = object.msg) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
var globalThis = (function () {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
var atob = globalThis.atob ||
    (function (b64) { return globalThis.Buffer.from(b64, "base64").toString("binary"); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
var btoa = globalThis.btoa ||
    (function (bin) { return globalThis.Buffer.from(bin, "binary").toString("base64"); });
function base64FromBytes(arr) {
    var e_5, _a;
    var bin = [];
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var byte = arr_1_1.value;
            bin.push(String.fromCharCode(byte));
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=card-game.js.map