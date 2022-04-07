/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Cmd enum.
 * @exports Cmd
 * @enum {number}
 * @property {number} NONE=0 NONE value
 * @property {number} READY_C2S=1 READY_C2S value
 * @property {number} DEALCARDS_S2C=2 DEALCARDS_S2C value
 * @property {number} COMPETEFORLANDLORDROLE_C2S=3 COMPETEFORLANDLORDROLE_C2S value
 * @property {number} COMPETEFORLANDLORDROLE_S2C=4 COMPETEFORLANDLORDROLE_S2C value
 * @property {number} PLAYTURN_S2C=5 PLAYTURN_S2C value
 * @property {number} PLAYCARDS_C2S=6 PLAYCARDS_C2S value
 * @property {number} PLAYCARDS_S2C=7 PLAYCARDS_S2C value
 * @property {number} ILLEGALCARDS_S2C=8 ILLEGALCARDS_S2C value
 * @property {number} GAMEEND_S2C=9 GAMEEND_S2C value
 * @property {number} GAMESTART_S2C=10 GAMESTART_S2C value
 * @property {number} BROADCAST_MSG_S2C=11 BROADCAST_MSG_S2C value
 */
$root.Cmd = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "NONE"] = 0;
    values[valuesById[1] = "READY_C2S"] = 1;
    values[valuesById[2] = "DEALCARDS_S2C"] = 2;
    values[valuesById[3] = "COMPETEFORLANDLORDROLE_C2S"] = 3;
    values[valuesById[4] = "COMPETEFORLANDLORDROLE_S2C"] = 4;
    values[valuesById[5] = "PLAYTURN_S2C"] = 5;
    values[valuesById[6] = "PLAYCARDS_C2S"] = 6;
    values[valuesById[7] = "PLAYCARDS_S2C"] = 7;
    values[valuesById[8] = "ILLEGALCARDS_S2C"] = 8;
    values[valuesById[9] = "GAMEEND_S2C"] = 9;
    values[valuesById[10] = "GAMESTART_S2C"] = 10;
    values[valuesById[11] = "BROADCAST_MSG_S2C"] = 11;
    return values;
})();

$root.MainMessage = (function() {

    /**
     * Properties of a MainMessage.
     * @exports IMainMessage
     * @interface IMainMessage
     * @property {number|null} [cmdId] MainMessage cmdId
     * @property {Uint8Array|null} [data] MainMessage data
     */

    /**
     * Constructs a new MainMessage.
     * @exports MainMessage
     * @classdesc Represents a MainMessage.
     * @implements IMainMessage
     * @constructor
     * @param {IMainMessage=} [properties] Properties to set
     */
    function MainMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MainMessage cmdId.
     * @member {number} cmdId
     * @memberof MainMessage
     * @instance
     */
    MainMessage.prototype.cmdId = 0;

    /**
     * MainMessage data.
     * @member {Uint8Array} data
     * @memberof MainMessage
     * @instance
     */
    MainMessage.prototype.data = $util.newBuffer([]);

    /**
     * Creates a new MainMessage instance using the specified properties.
     * @function create
     * @memberof MainMessage
     * @static
     * @param {IMainMessage=} [properties] Properties to set
     * @returns {MainMessage} MainMessage instance
     */
    MainMessage.create = function create(properties) {
        return new MainMessage(properties);
    };

    /**
     * Encodes the specified MainMessage message. Does not implicitly {@link MainMessage.verify|verify} messages.
     * @function encode
     * @memberof MainMessage
     * @static
     * @param {IMainMessage} message MainMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MainMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cmdId != null && Object.hasOwnProperty.call(message, "cmdId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.cmdId);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
        return writer;
    };

    /**
     * Encodes the specified MainMessage message, length delimited. Does not implicitly {@link MainMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MainMessage
     * @static
     * @param {IMainMessage} message MainMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MainMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MainMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MainMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MainMessage} MainMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MainMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MainMessage();
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
    };

    /**
     * Decodes a MainMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MainMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MainMessage} MainMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MainMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MainMessage message.
     * @function verify
     * @memberof MainMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MainMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cmdId != null && message.hasOwnProperty("cmdId"))
            if (!$util.isInteger(message.cmdId))
                return "cmdId: integer expected";
        if (message.data != null && message.hasOwnProperty("data"))
            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
        return null;
    };

    /**
     * Creates a MainMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MainMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MainMessage} MainMessage
     */
    MainMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MainMessage)
            return object;
        var message = new $root.MainMessage();
        if (object.cmdId != null)
            message.cmdId = object.cmdId >>> 0;
        if (object.data != null)
            if (typeof object.data === "string")
                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
            else if (object.data.length)
                message.data = object.data;
        return message;
    };

    /**
     * Creates a plain object from a MainMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MainMessage
     * @static
     * @param {MainMessage} message MainMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MainMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.cmdId = 0;
            if (options.bytes === String)
                object.data = "";
            else {
                object.data = [];
                if (options.bytes !== Array)
                    object.data = $util.newBuffer(object.data);
            }
        }
        if (message.cmdId != null && message.hasOwnProperty("cmdId"))
            object.cmdId = message.cmdId;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
        return object;
    };

    /**
     * Converts this MainMessage to JSON.
     * @function toJSON
     * @memberof MainMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MainMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MainMessage;
})();

$root.DealCards_S2C = (function() {

    /**
     * Properties of a DealCards_S2C.
     * @exports IDealCards_S2C
     * @interface IDealCards_S2C
     * @property {Array.<number>|null} [cards] DealCards_S2C cards
     * @property {number|null} [seatNumber] DealCards_S2C seatNumber
     */

    /**
     * Constructs a new DealCards_S2C.
     * @exports DealCards_S2C
     * @classdesc Represents a DealCards_S2C.
     * @implements IDealCards_S2C
     * @constructor
     * @param {IDealCards_S2C=} [properties] Properties to set
     */
    function DealCards_S2C(properties) {
        this.cards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DealCards_S2C cards.
     * @member {Array.<number>} cards
     * @memberof DealCards_S2C
     * @instance
     */
    DealCards_S2C.prototype.cards = $util.emptyArray;

    /**
     * DealCards_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof DealCards_S2C
     * @instance
     */
    DealCards_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new DealCards_S2C instance using the specified properties.
     * @function create
     * @memberof DealCards_S2C
     * @static
     * @param {IDealCards_S2C=} [properties] Properties to set
     * @returns {DealCards_S2C} DealCards_S2C instance
     */
    DealCards_S2C.create = function create(properties) {
        return new DealCards_S2C(properties);
    };

    /**
     * Encodes the specified DealCards_S2C message. Does not implicitly {@link DealCards_S2C.verify|verify} messages.
     * @function encode
     * @memberof DealCards_S2C
     * @static
     * @param {IDealCards_S2C} message DealCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DealCards_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cards != null && message.cards.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.cards.length; ++i)
                writer.uint32(message.cards[i]);
            writer.ldelim();
        }
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified DealCards_S2C message, length delimited. Does not implicitly {@link DealCards_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DealCards_S2C
     * @static
     * @param {IDealCards_S2C} message DealCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DealCards_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DealCards_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof DealCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DealCards_S2C} DealCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DealCards_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DealCards_S2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.cards && message.cards.length))
                    message.cards = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.cards.push(reader.uint32());
                } else
                    message.cards.push(reader.uint32());
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
    };

    /**
     * Decodes a DealCards_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DealCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DealCards_S2C} DealCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DealCards_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DealCards_S2C message.
     * @function verify
     * @memberof DealCards_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DealCards_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cards != null && message.hasOwnProperty("cards")) {
            if (!Array.isArray(message.cards))
                return "cards: array expected";
            for (var i = 0; i < message.cards.length; ++i)
                if (!$util.isInteger(message.cards[i]))
                    return "cards: integer[] expected";
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a DealCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DealCards_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DealCards_S2C} DealCards_S2C
     */
    DealCards_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.DealCards_S2C)
            return object;
        var message = new $root.DealCards_S2C();
        if (object.cards) {
            if (!Array.isArray(object.cards))
                throw TypeError(".DealCards_S2C.cards: array expected");
            message.cards = [];
            for (var i = 0; i < object.cards.length; ++i)
                message.cards[i] = object.cards[i] >>> 0;
        }
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a DealCards_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DealCards_S2C
     * @static
     * @param {DealCards_S2C} message DealCards_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DealCards_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.cards = [];
        if (options.defaults)
            object.seatNumber = 0;
        if (message.cards && message.cards.length) {
            object.cards = [];
            for (var j = 0; j < message.cards.length; ++j)
                object.cards[j] = message.cards[j];
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this DealCards_S2C to JSON.
     * @function toJSON
     * @memberof DealCards_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DealCards_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DealCards_S2C;
})();

$root.Ready_C2S = (function() {

    /**
     * Properties of a Ready_C2S.
     * @exports IReady_C2S
     * @interface IReady_C2S
     * @property {number|null} [seatNumber] Ready_C2S seatNumber
     */

    /**
     * Constructs a new Ready_C2S.
     * @exports Ready_C2S
     * @classdesc Represents a Ready_C2S.
     * @implements IReady_C2S
     * @constructor
     * @param {IReady_C2S=} [properties] Properties to set
     */
    function Ready_C2S(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Ready_C2S seatNumber.
     * @member {number} seatNumber
     * @memberof Ready_C2S
     * @instance
     */
    Ready_C2S.prototype.seatNumber = 0;

    /**
     * Creates a new Ready_C2S instance using the specified properties.
     * @function create
     * @memberof Ready_C2S
     * @static
     * @param {IReady_C2S=} [properties] Properties to set
     * @returns {Ready_C2S} Ready_C2S instance
     */
    Ready_C2S.create = function create(properties) {
        return new Ready_C2S(properties);
    };

    /**
     * Encodes the specified Ready_C2S message. Does not implicitly {@link Ready_C2S.verify|verify} messages.
     * @function encode
     * @memberof Ready_C2S
     * @static
     * @param {IReady_C2S} message Ready_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ready_C2S.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified Ready_C2S message, length delimited. Does not implicitly {@link Ready_C2S.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ready_C2S
     * @static
     * @param {IReady_C2S} message Ready_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ready_C2S.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ready_C2S message from the specified reader or buffer.
     * @function decode
     * @memberof Ready_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ready_C2S} Ready_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ready_C2S.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ready_C2S();
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
    };

    /**
     * Decodes a Ready_C2S message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ready_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ready_C2S} Ready_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ready_C2S.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ready_C2S message.
     * @function verify
     * @memberof Ready_C2S
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ready_C2S.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a Ready_C2S message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ready_C2S
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ready_C2S} Ready_C2S
     */
    Ready_C2S.fromObject = function fromObject(object) {
        if (object instanceof $root.Ready_C2S)
            return object;
        var message = new $root.Ready_C2S();
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Ready_C2S message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ready_C2S
     * @static
     * @param {Ready_C2S} message Ready_C2S
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ready_C2S.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.seatNumber = 0;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this Ready_C2S to JSON.
     * @function toJSON
     * @memberof Ready_C2S
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ready_C2S.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ready_C2S;
})();

$root.CompeteForLandLordRole_C2S = (function() {

    /**
     * Properties of a CompeteForLandLordRole_C2S.
     * @exports ICompeteForLandLordRole_C2S
     * @interface ICompeteForLandLordRole_C2S
     * @property {number|null} [score] CompeteForLandLordRole_C2S score
     * @property {number|null} [seatNumber] CompeteForLandLordRole_C2S seatNumber
     */

    /**
     * Constructs a new CompeteForLandLordRole_C2S.
     * @exports CompeteForLandLordRole_C2S
     * @classdesc Represents a CompeteForLandLordRole_C2S.
     * @implements ICompeteForLandLordRole_C2S
     * @constructor
     * @param {ICompeteForLandLordRole_C2S=} [properties] Properties to set
     */
    function CompeteForLandLordRole_C2S(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CompeteForLandLordRole_C2S score.
     * @member {number} score
     * @memberof CompeteForLandLordRole_C2S
     * @instance
     */
    CompeteForLandLordRole_C2S.prototype.score = 0;

    /**
     * CompeteForLandLordRole_C2S seatNumber.
     * @member {number} seatNumber
     * @memberof CompeteForLandLordRole_C2S
     * @instance
     */
    CompeteForLandLordRole_C2S.prototype.seatNumber = 0;

    /**
     * Creates a new CompeteForLandLordRole_C2S instance using the specified properties.
     * @function create
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {ICompeteForLandLordRole_C2S=} [properties] Properties to set
     * @returns {CompeteForLandLordRole_C2S} CompeteForLandLordRole_C2S instance
     */
    CompeteForLandLordRole_C2S.create = function create(properties) {
        return new CompeteForLandLordRole_C2S(properties);
    };

    /**
     * Encodes the specified CompeteForLandLordRole_C2S message. Does not implicitly {@link CompeteForLandLordRole_C2S.verify|verify} messages.
     * @function encode
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {ICompeteForLandLordRole_C2S} message CompeteForLandLordRole_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CompeteForLandLordRole_C2S.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.score != null && Object.hasOwnProperty.call(message, "score"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.score);
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified CompeteForLandLordRole_C2S message, length delimited. Does not implicitly {@link CompeteForLandLordRole_C2S.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {ICompeteForLandLordRole_C2S} message CompeteForLandLordRole_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CompeteForLandLordRole_C2S.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CompeteForLandLordRole_C2S message from the specified reader or buffer.
     * @function decode
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CompeteForLandLordRole_C2S} CompeteForLandLordRole_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CompeteForLandLordRole_C2S.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CompeteForLandLordRole_C2S();
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
    };

    /**
     * Decodes a CompeteForLandLordRole_C2S message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CompeteForLandLordRole_C2S} CompeteForLandLordRole_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CompeteForLandLordRole_C2S.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CompeteForLandLordRole_C2S message.
     * @function verify
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CompeteForLandLordRole_C2S.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.score != null && message.hasOwnProperty("score"))
            if (!$util.isInteger(message.score))
                return "score: integer expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a CompeteForLandLordRole_C2S message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CompeteForLandLordRole_C2S} CompeteForLandLordRole_C2S
     */
    CompeteForLandLordRole_C2S.fromObject = function fromObject(object) {
        if (object instanceof $root.CompeteForLandLordRole_C2S)
            return object;
        var message = new $root.CompeteForLandLordRole_C2S();
        if (object.score != null)
            message.score = object.score >>> 0;
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CompeteForLandLordRole_C2S message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CompeteForLandLordRole_C2S
     * @static
     * @param {CompeteForLandLordRole_C2S} message CompeteForLandLordRole_C2S
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CompeteForLandLordRole_C2S.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.score = 0;
            object.seatNumber = 0;
        }
        if (message.score != null && message.hasOwnProperty("score"))
            object.score = message.score;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this CompeteForLandLordRole_C2S to JSON.
     * @function toJSON
     * @memberof CompeteForLandLordRole_C2S
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CompeteForLandLordRole_C2S.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CompeteForLandLordRole_C2S;
})();

$root.CompeteForLandLordRole_S2C = (function() {

    /**
     * Properties of a CompeteForLandLordRole_S2C.
     * @exports ICompeteForLandLordRole_S2C
     * @interface ICompeteForLandLordRole_S2C
     * @property {number|null} [curMaxScore] CompeteForLandLordRole_S2C curMaxScore
     * @property {number|null} [seatNumber] CompeteForLandLordRole_S2C seatNumber
     */

    /**
     * Constructs a new CompeteForLandLordRole_S2C.
     * @exports CompeteForLandLordRole_S2C
     * @classdesc Represents a CompeteForLandLordRole_S2C.
     * @implements ICompeteForLandLordRole_S2C
     * @constructor
     * @param {ICompeteForLandLordRole_S2C=} [properties] Properties to set
     */
    function CompeteForLandLordRole_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CompeteForLandLordRole_S2C curMaxScore.
     * @member {number} curMaxScore
     * @memberof CompeteForLandLordRole_S2C
     * @instance
     */
    CompeteForLandLordRole_S2C.prototype.curMaxScore = 0;

    /**
     * CompeteForLandLordRole_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof CompeteForLandLordRole_S2C
     * @instance
     */
    CompeteForLandLordRole_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new CompeteForLandLordRole_S2C instance using the specified properties.
     * @function create
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {ICompeteForLandLordRole_S2C=} [properties] Properties to set
     * @returns {CompeteForLandLordRole_S2C} CompeteForLandLordRole_S2C instance
     */
    CompeteForLandLordRole_S2C.create = function create(properties) {
        return new CompeteForLandLordRole_S2C(properties);
    };

    /**
     * Encodes the specified CompeteForLandLordRole_S2C message. Does not implicitly {@link CompeteForLandLordRole_S2C.verify|verify} messages.
     * @function encode
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {ICompeteForLandLordRole_S2C} message CompeteForLandLordRole_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CompeteForLandLordRole_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.curMaxScore != null && Object.hasOwnProperty.call(message, "curMaxScore"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.curMaxScore);
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified CompeteForLandLordRole_S2C message, length delimited. Does not implicitly {@link CompeteForLandLordRole_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {ICompeteForLandLordRole_S2C} message CompeteForLandLordRole_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CompeteForLandLordRole_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CompeteForLandLordRole_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CompeteForLandLordRole_S2C} CompeteForLandLordRole_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CompeteForLandLordRole_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CompeteForLandLordRole_S2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.curMaxScore = reader.uint32();
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
    };

    /**
     * Decodes a CompeteForLandLordRole_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CompeteForLandLordRole_S2C} CompeteForLandLordRole_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CompeteForLandLordRole_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CompeteForLandLordRole_S2C message.
     * @function verify
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CompeteForLandLordRole_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.curMaxScore != null && message.hasOwnProperty("curMaxScore"))
            if (!$util.isInteger(message.curMaxScore))
                return "curMaxScore: integer expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a CompeteForLandLordRole_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CompeteForLandLordRole_S2C} CompeteForLandLordRole_S2C
     */
    CompeteForLandLordRole_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.CompeteForLandLordRole_S2C)
            return object;
        var message = new $root.CompeteForLandLordRole_S2C();
        if (object.curMaxScore != null)
            message.curMaxScore = object.curMaxScore >>> 0;
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CompeteForLandLordRole_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CompeteForLandLordRole_S2C
     * @static
     * @param {CompeteForLandLordRole_S2C} message CompeteForLandLordRole_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CompeteForLandLordRole_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.curMaxScore = 0;
            object.seatNumber = 0;
        }
        if (message.curMaxScore != null && message.hasOwnProperty("curMaxScore"))
            object.curMaxScore = message.curMaxScore;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this CompeteForLandLordRole_S2C to JSON.
     * @function toJSON
     * @memberof CompeteForLandLordRole_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CompeteForLandLordRole_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CompeteForLandLordRole_S2C;
})();

$root.PlayCards_C2S = (function() {

    /**
     * Properties of a PlayCards_C2S.
     * @exports IPlayCards_C2S
     * @interface IPlayCards_C2S
     * @property {Array.<number>|null} [cards] PlayCards_C2S cards
     * @property {number|null} [seatNumber] PlayCards_C2S seatNumber
     */

    /**
     * Constructs a new PlayCards_C2S.
     * @exports PlayCards_C2S
     * @classdesc Represents a PlayCards_C2S.
     * @implements IPlayCards_C2S
     * @constructor
     * @param {IPlayCards_C2S=} [properties] Properties to set
     */
    function PlayCards_C2S(properties) {
        this.cards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayCards_C2S cards.
     * @member {Array.<number>} cards
     * @memberof PlayCards_C2S
     * @instance
     */
    PlayCards_C2S.prototype.cards = $util.emptyArray;

    /**
     * PlayCards_C2S seatNumber.
     * @member {number} seatNumber
     * @memberof PlayCards_C2S
     * @instance
     */
    PlayCards_C2S.prototype.seatNumber = 0;

    /**
     * Creates a new PlayCards_C2S instance using the specified properties.
     * @function create
     * @memberof PlayCards_C2S
     * @static
     * @param {IPlayCards_C2S=} [properties] Properties to set
     * @returns {PlayCards_C2S} PlayCards_C2S instance
     */
    PlayCards_C2S.create = function create(properties) {
        return new PlayCards_C2S(properties);
    };

    /**
     * Encodes the specified PlayCards_C2S message. Does not implicitly {@link PlayCards_C2S.verify|verify} messages.
     * @function encode
     * @memberof PlayCards_C2S
     * @static
     * @param {IPlayCards_C2S} message PlayCards_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayCards_C2S.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cards != null && message.cards.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.cards.length; ++i)
                writer.uint32(message.cards[i]);
            writer.ldelim();
        }
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified PlayCards_C2S message, length delimited. Does not implicitly {@link PlayCards_C2S.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayCards_C2S
     * @static
     * @param {IPlayCards_C2S} message PlayCards_C2S message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayCards_C2S.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayCards_C2S message from the specified reader or buffer.
     * @function decode
     * @memberof PlayCards_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayCards_C2S} PlayCards_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayCards_C2S.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayCards_C2S();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.cards && message.cards.length))
                    message.cards = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.cards.push(reader.uint32());
                } else
                    message.cards.push(reader.uint32());
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
    };

    /**
     * Decodes a PlayCards_C2S message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayCards_C2S
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayCards_C2S} PlayCards_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayCards_C2S.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayCards_C2S message.
     * @function verify
     * @memberof PlayCards_C2S
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayCards_C2S.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cards != null && message.hasOwnProperty("cards")) {
            if (!Array.isArray(message.cards))
                return "cards: array expected";
            for (var i = 0; i < message.cards.length; ++i)
                if (!$util.isInteger(message.cards[i]))
                    return "cards: integer[] expected";
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a PlayCards_C2S message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayCards_C2S
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayCards_C2S} PlayCards_C2S
     */
    PlayCards_C2S.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayCards_C2S)
            return object;
        var message = new $root.PlayCards_C2S();
        if (object.cards) {
            if (!Array.isArray(object.cards))
                throw TypeError(".PlayCards_C2S.cards: array expected");
            message.cards = [];
            for (var i = 0; i < object.cards.length; ++i)
                message.cards[i] = object.cards[i] >>> 0;
        }
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayCards_C2S message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayCards_C2S
     * @static
     * @param {PlayCards_C2S} message PlayCards_C2S
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayCards_C2S.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.cards = [];
        if (options.defaults)
            object.seatNumber = 0;
        if (message.cards && message.cards.length) {
            object.cards = [];
            for (var j = 0; j < message.cards.length; ++j)
                object.cards[j] = message.cards[j];
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this PlayCards_C2S to JSON.
     * @function toJSON
     * @memberof PlayCards_C2S
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayCards_C2S.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayCards_C2S;
})();

$root.PlayCards_S2C = (function() {

    /**
     * Properties of a PlayCards_S2C.
     * @exports IPlayCards_S2C
     * @interface IPlayCards_S2C
     * @property {Array.<number>|null} [cards] PlayCards_S2C cards
     * @property {number|null} [seatNumber] PlayCards_S2C seatNumber
     */

    /**
     * Constructs a new PlayCards_S2C.
     * @exports PlayCards_S2C
     * @classdesc Represents a PlayCards_S2C.
     * @implements IPlayCards_S2C
     * @constructor
     * @param {IPlayCards_S2C=} [properties] Properties to set
     */
    function PlayCards_S2C(properties) {
        this.cards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayCards_S2C cards.
     * @member {Array.<number>} cards
     * @memberof PlayCards_S2C
     * @instance
     */
    PlayCards_S2C.prototype.cards = $util.emptyArray;

    /**
     * PlayCards_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof PlayCards_S2C
     * @instance
     */
    PlayCards_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new PlayCards_S2C instance using the specified properties.
     * @function create
     * @memberof PlayCards_S2C
     * @static
     * @param {IPlayCards_S2C=} [properties] Properties to set
     * @returns {PlayCards_S2C} PlayCards_S2C instance
     */
    PlayCards_S2C.create = function create(properties) {
        return new PlayCards_S2C(properties);
    };

    /**
     * Encodes the specified PlayCards_S2C message. Does not implicitly {@link PlayCards_S2C.verify|verify} messages.
     * @function encode
     * @memberof PlayCards_S2C
     * @static
     * @param {IPlayCards_S2C} message PlayCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayCards_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cards != null && message.cards.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.cards.length; ++i)
                writer.uint32(message.cards[i]);
            writer.ldelim();
        }
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified PlayCards_S2C message, length delimited. Does not implicitly {@link PlayCards_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayCards_S2C
     * @static
     * @param {IPlayCards_S2C} message PlayCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayCards_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayCards_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof PlayCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayCards_S2C} PlayCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayCards_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayCards_S2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.cards && message.cards.length))
                    message.cards = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.cards.push(reader.uint32());
                } else
                    message.cards.push(reader.uint32());
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
    };

    /**
     * Decodes a PlayCards_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayCards_S2C} PlayCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayCards_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayCards_S2C message.
     * @function verify
     * @memberof PlayCards_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayCards_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cards != null && message.hasOwnProperty("cards")) {
            if (!Array.isArray(message.cards))
                return "cards: array expected";
            for (var i = 0; i < message.cards.length; ++i)
                if (!$util.isInteger(message.cards[i]))
                    return "cards: integer[] expected";
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a PlayCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayCards_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayCards_S2C} PlayCards_S2C
     */
    PlayCards_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayCards_S2C)
            return object;
        var message = new $root.PlayCards_S2C();
        if (object.cards) {
            if (!Array.isArray(object.cards))
                throw TypeError(".PlayCards_S2C.cards: array expected");
            message.cards = [];
            for (var i = 0; i < object.cards.length; ++i)
                message.cards[i] = object.cards[i] >>> 0;
        }
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayCards_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayCards_S2C
     * @static
     * @param {PlayCards_S2C} message PlayCards_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayCards_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.cards = [];
        if (options.defaults)
            object.seatNumber = 0;
        if (message.cards && message.cards.length) {
            object.cards = [];
            for (var j = 0; j < message.cards.length; ++j)
                object.cards[j] = message.cards[j];
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this PlayCards_S2C to JSON.
     * @function toJSON
     * @memberof PlayCards_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayCards_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayCards_S2C;
})();

$root.IllegalCards_S2C = (function() {

    /**
     * Properties of an IllegalCards_S2C.
     * @exports IIllegalCards_S2C
     * @interface IIllegalCards_S2C
     * @property {number|null} [seatNumber] IllegalCards_S2C seatNumber
     */

    /**
     * Constructs a new IllegalCards_S2C.
     * @exports IllegalCards_S2C
     * @classdesc Represents an IllegalCards_S2C.
     * @implements IIllegalCards_S2C
     * @constructor
     * @param {IIllegalCards_S2C=} [properties] Properties to set
     */
    function IllegalCards_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * IllegalCards_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof IllegalCards_S2C
     * @instance
     */
    IllegalCards_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new IllegalCards_S2C instance using the specified properties.
     * @function create
     * @memberof IllegalCards_S2C
     * @static
     * @param {IIllegalCards_S2C=} [properties] Properties to set
     * @returns {IllegalCards_S2C} IllegalCards_S2C instance
     */
    IllegalCards_S2C.create = function create(properties) {
        return new IllegalCards_S2C(properties);
    };

    /**
     * Encodes the specified IllegalCards_S2C message. Does not implicitly {@link IllegalCards_S2C.verify|verify} messages.
     * @function encode
     * @memberof IllegalCards_S2C
     * @static
     * @param {IIllegalCards_S2C} message IllegalCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IllegalCards_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified IllegalCards_S2C message, length delimited. Does not implicitly {@link IllegalCards_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof IllegalCards_S2C
     * @static
     * @param {IIllegalCards_S2C} message IllegalCards_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IllegalCards_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an IllegalCards_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof IllegalCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {IllegalCards_S2C} IllegalCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IllegalCards_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.IllegalCards_S2C();
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
    };

    /**
     * Decodes an IllegalCards_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof IllegalCards_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {IllegalCards_S2C} IllegalCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IllegalCards_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an IllegalCards_S2C message.
     * @function verify
     * @memberof IllegalCards_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    IllegalCards_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates an IllegalCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof IllegalCards_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {IllegalCards_S2C} IllegalCards_S2C
     */
    IllegalCards_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.IllegalCards_S2C)
            return object;
        var message = new $root.IllegalCards_S2C();
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from an IllegalCards_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof IllegalCards_S2C
     * @static
     * @param {IllegalCards_S2C} message IllegalCards_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    IllegalCards_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.seatNumber = 0;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this IllegalCards_S2C to JSON.
     * @function toJSON
     * @memberof IllegalCards_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    IllegalCards_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return IllegalCards_S2C;
})();

$root.GameEnd_S2C = (function() {

    /**
     * Properties of a GameEnd_S2C.
     * @exports IGameEnd_S2C
     * @interface IGameEnd_S2C
     * @property {number|null} [seatNumber] GameEnd_S2C seatNumber
     */

    /**
     * Constructs a new GameEnd_S2C.
     * @exports GameEnd_S2C
     * @classdesc Represents a GameEnd_S2C.
     * @implements IGameEnd_S2C
     * @constructor
     * @param {IGameEnd_S2C=} [properties] Properties to set
     */
    function GameEnd_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameEnd_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof GameEnd_S2C
     * @instance
     */
    GameEnd_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new GameEnd_S2C instance using the specified properties.
     * @function create
     * @memberof GameEnd_S2C
     * @static
     * @param {IGameEnd_S2C=} [properties] Properties to set
     * @returns {GameEnd_S2C} GameEnd_S2C instance
     */
    GameEnd_S2C.create = function create(properties) {
        return new GameEnd_S2C(properties);
    };

    /**
     * Encodes the specified GameEnd_S2C message. Does not implicitly {@link GameEnd_S2C.verify|verify} messages.
     * @function encode
     * @memberof GameEnd_S2C
     * @static
     * @param {IGameEnd_S2C} message GameEnd_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameEnd_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified GameEnd_S2C message, length delimited. Does not implicitly {@link GameEnd_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameEnd_S2C
     * @static
     * @param {IGameEnd_S2C} message GameEnd_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameEnd_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameEnd_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof GameEnd_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameEnd_S2C} GameEnd_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameEnd_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEnd_S2C();
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
    };

    /**
     * Decodes a GameEnd_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameEnd_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameEnd_S2C} GameEnd_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameEnd_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameEnd_S2C message.
     * @function verify
     * @memberof GameEnd_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameEnd_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a GameEnd_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameEnd_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameEnd_S2C} GameEnd_S2C
     */
    GameEnd_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.GameEnd_S2C)
            return object;
        var message = new $root.GameEnd_S2C();
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a GameEnd_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameEnd_S2C
     * @static
     * @param {GameEnd_S2C} message GameEnd_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameEnd_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.seatNumber = 0;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this GameEnd_S2C to JSON.
     * @function toJSON
     * @memberof GameEnd_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameEnd_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameEnd_S2C;
})();

$root.PlayTurn_S2C = (function() {

    /**
     * Properties of a PlayTurn_S2C.
     * @exports IPlayTurn_S2C
     * @interface IPlayTurn_S2C
     * @property {number|null} [seatNumber] PlayTurn_S2C seatNumber
     */

    /**
     * Constructs a new PlayTurn_S2C.
     * @exports PlayTurn_S2C
     * @classdesc Represents a PlayTurn_S2C.
     * @implements IPlayTurn_S2C
     * @constructor
     * @param {IPlayTurn_S2C=} [properties] Properties to set
     */
    function PlayTurn_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayTurn_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof PlayTurn_S2C
     * @instance
     */
    PlayTurn_S2C.prototype.seatNumber = 0;

    /**
     * Creates a new PlayTurn_S2C instance using the specified properties.
     * @function create
     * @memberof PlayTurn_S2C
     * @static
     * @param {IPlayTurn_S2C=} [properties] Properties to set
     * @returns {PlayTurn_S2C} PlayTurn_S2C instance
     */
    PlayTurn_S2C.create = function create(properties) {
        return new PlayTurn_S2C(properties);
    };

    /**
     * Encodes the specified PlayTurn_S2C message. Does not implicitly {@link PlayTurn_S2C.verify|verify} messages.
     * @function encode
     * @memberof PlayTurn_S2C
     * @static
     * @param {IPlayTurn_S2C} message PlayTurn_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayTurn_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seatNumber);
        return writer;
    };

    /**
     * Encodes the specified PlayTurn_S2C message, length delimited. Does not implicitly {@link PlayTurn_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayTurn_S2C
     * @static
     * @param {IPlayTurn_S2C} message PlayTurn_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayTurn_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayTurn_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof PlayTurn_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayTurn_S2C} PlayTurn_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayTurn_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayTurn_S2C();
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
    };

    /**
     * Decodes a PlayTurn_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayTurn_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayTurn_S2C} PlayTurn_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayTurn_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayTurn_S2C message.
     * @function verify
     * @memberof PlayTurn_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayTurn_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        return null;
    };

    /**
     * Creates a PlayTurn_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayTurn_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayTurn_S2C} PlayTurn_S2C
     */
    PlayTurn_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayTurn_S2C)
            return object;
        var message = new $root.PlayTurn_S2C();
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PlayTurn_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayTurn_S2C
     * @static
     * @param {PlayTurn_S2C} message PlayTurn_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayTurn_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.seatNumber = 0;
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        return object;
    };

    /**
     * Converts this PlayTurn_S2C to JSON.
     * @function toJSON
     * @memberof PlayTurn_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayTurn_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayTurn_S2C;
})();

$root.GameStart_S2C = (function() {

    /**
     * Properties of a GameStart_S2C.
     * @exports IGameStart_S2C
     * @interface IGameStart_S2C
     * @property {number|null} [seatNumber] GameStart_S2C seatNumber
     * @property {number|null} [playerId] GameStart_S2C playerId
     * @property {number|null} [playerCount] GameStart_S2C playerCount
     */

    /**
     * Constructs a new GameStart_S2C.
     * @exports GameStart_S2C
     * @classdesc Represents a GameStart_S2C.
     * @implements IGameStart_S2C
     * @constructor
     * @param {IGameStart_S2C=} [properties] Properties to set
     */
    function GameStart_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameStart_S2C seatNumber.
     * @member {number} seatNumber
     * @memberof GameStart_S2C
     * @instance
     */
    GameStart_S2C.prototype.seatNumber = 0;

    /**
     * GameStart_S2C playerId.
     * @member {number} playerId
     * @memberof GameStart_S2C
     * @instance
     */
    GameStart_S2C.prototype.playerId = 0;

    /**
     * GameStart_S2C playerCount.
     * @member {number} playerCount
     * @memberof GameStart_S2C
     * @instance
     */
    GameStart_S2C.prototype.playerCount = 0;

    /**
     * Creates a new GameStart_S2C instance using the specified properties.
     * @function create
     * @memberof GameStart_S2C
     * @static
     * @param {IGameStart_S2C=} [properties] Properties to set
     * @returns {GameStart_S2C} GameStart_S2C instance
     */
    GameStart_S2C.create = function create(properties) {
        return new GameStart_S2C(properties);
    };

    /**
     * Encodes the specified GameStart_S2C message. Does not implicitly {@link GameStart_S2C.verify|verify} messages.
     * @function encode
     * @memberof GameStart_S2C
     * @static
     * @param {IGameStart_S2C} message GameStart_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameStart_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatNumber != null && Object.hasOwnProperty.call(message, "seatNumber"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seatNumber);
        if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.playerId);
        if (message.playerCount != null && Object.hasOwnProperty.call(message, "playerCount"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.playerCount);
        return writer;
    };

    /**
     * Encodes the specified GameStart_S2C message, length delimited. Does not implicitly {@link GameStart_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameStart_S2C
     * @static
     * @param {IGameStart_S2C} message GameStart_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameStart_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameStart_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof GameStart_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameStart_S2C} GameStart_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameStart_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameStart_S2C();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.seatNumber = reader.uint32();
                break;
            case 2:
                message.playerId = reader.uint32();
                break;
            case 3:
                message.playerCount = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameStart_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameStart_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameStart_S2C} GameStart_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameStart_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameStart_S2C message.
     * @function verify
     * @memberof GameStart_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameStart_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            if (!$util.isInteger(message.seatNumber))
                return "seatNumber: integer expected";
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            if (!$util.isInteger(message.playerId))
                return "playerId: integer expected";
        if (message.playerCount != null && message.hasOwnProperty("playerCount"))
            if (!$util.isInteger(message.playerCount))
                return "playerCount: integer expected";
        return null;
    };

    /**
     * Creates a GameStart_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameStart_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameStart_S2C} GameStart_S2C
     */
    GameStart_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.GameStart_S2C)
            return object;
        var message = new $root.GameStart_S2C();
        if (object.seatNumber != null)
            message.seatNumber = object.seatNumber >>> 0;
        if (object.playerId != null)
            message.playerId = object.playerId >>> 0;
        if (object.playerCount != null)
            message.playerCount = object.playerCount >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a GameStart_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameStart_S2C
     * @static
     * @param {GameStart_S2C} message GameStart_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameStart_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.seatNumber = 0;
            object.playerId = 0;
            object.playerCount = 0;
        }
        if (message.seatNumber != null && message.hasOwnProperty("seatNumber"))
            object.seatNumber = message.seatNumber;
        if (message.playerId != null && message.hasOwnProperty("playerId"))
            object.playerId = message.playerId;
        if (message.playerCount != null && message.hasOwnProperty("playerCount"))
            object.playerCount = message.playerCount;
        return object;
    };

    /**
     * Converts this GameStart_S2C to JSON.
     * @function toJSON
     * @memberof GameStart_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameStart_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameStart_S2C;
})();

$root.BroadCastMsg_S2C = (function() {

    /**
     * Properties of a BroadCastMsg_S2C.
     * @exports IBroadCastMsg_S2C
     * @interface IBroadCastMsg_S2C
     * @property {string|null} [msg] BroadCastMsg_S2C msg
     */

    /**
     * Constructs a new BroadCastMsg_S2C.
     * @exports BroadCastMsg_S2C
     * @classdesc Represents a BroadCastMsg_S2C.
     * @implements IBroadCastMsg_S2C
     * @constructor
     * @param {IBroadCastMsg_S2C=} [properties] Properties to set
     */
    function BroadCastMsg_S2C(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BroadCastMsg_S2C msg.
     * @member {string} msg
     * @memberof BroadCastMsg_S2C
     * @instance
     */
    BroadCastMsg_S2C.prototype.msg = "";

    /**
     * Creates a new BroadCastMsg_S2C instance using the specified properties.
     * @function create
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {IBroadCastMsg_S2C=} [properties] Properties to set
     * @returns {BroadCastMsg_S2C} BroadCastMsg_S2C instance
     */
    BroadCastMsg_S2C.create = function create(properties) {
        return new BroadCastMsg_S2C(properties);
    };

    /**
     * Encodes the specified BroadCastMsg_S2C message. Does not implicitly {@link BroadCastMsg_S2C.verify|verify} messages.
     * @function encode
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {IBroadCastMsg_S2C} message BroadCastMsg_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BroadCastMsg_S2C.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
        return writer;
    };

    /**
     * Encodes the specified BroadCastMsg_S2C message, length delimited. Does not implicitly {@link BroadCastMsg_S2C.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {IBroadCastMsg_S2C} message BroadCastMsg_S2C message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BroadCastMsg_S2C.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BroadCastMsg_S2C message from the specified reader or buffer.
     * @function decode
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BroadCastMsg_S2C} BroadCastMsg_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BroadCastMsg_S2C.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BroadCastMsg_S2C();
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
    };

    /**
     * Decodes a BroadCastMsg_S2C message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BroadCastMsg_S2C} BroadCastMsg_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BroadCastMsg_S2C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BroadCastMsg_S2C message.
     * @function verify
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BroadCastMsg_S2C.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.msg != null && message.hasOwnProperty("msg"))
            if (!$util.isString(message.msg))
                return "msg: string expected";
        return null;
    };

    /**
     * Creates a BroadCastMsg_S2C message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BroadCastMsg_S2C} BroadCastMsg_S2C
     */
    BroadCastMsg_S2C.fromObject = function fromObject(object) {
        if (object instanceof $root.BroadCastMsg_S2C)
            return object;
        var message = new $root.BroadCastMsg_S2C();
        if (object.msg != null)
            message.msg = String(object.msg);
        return message;
    };

    /**
     * Creates a plain object from a BroadCastMsg_S2C message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BroadCastMsg_S2C
     * @static
     * @param {BroadCastMsg_S2C} message BroadCastMsg_S2C
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BroadCastMsg_S2C.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.msg = "";
        if (message.msg != null && message.hasOwnProperty("msg"))
            object.msg = message.msg;
        return object;
    };

    /**
     * Converts this BroadCastMsg_S2C to JSON.
     * @function toJSON
     * @memberof BroadCastMsg_S2C
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BroadCastMsg_S2C.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BroadCastMsg_S2C;
})();

module.exports = $root;
