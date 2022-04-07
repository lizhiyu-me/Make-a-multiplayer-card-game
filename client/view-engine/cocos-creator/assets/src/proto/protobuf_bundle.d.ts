import * as $protobuf from "./protobuf";
/** Cmd enum. */
export enum Cmd {
    NONE = 0,
    READY_C2S = 1,
    DEALCARDS_S2C = 2,
    COMPETEFORLANDLORDROLE_C2S = 3,
    COMPETEFORLANDLORDROLE_S2C = 4,
    PLAYTURN_S2C = 5,
    PLAYCARDS_C2S = 6,
    PLAYCARDS_S2C = 7,
    ILLEGALCARDS_S2C = 8,
    GAMEEND_S2C = 9,
    GAMESTART_S2C = 10,
    BROADCAST_MSG_S2C = 11
}

/** Represents a MainMessage. */
export class MainMessage implements IMainMessage {

    /**
     * Constructs a new MainMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMainMessage);

    /** MainMessage cmdId. */
    public cmdId: number;

    /** MainMessage data. */
    public data: Uint8Array;

    /**
     * Creates a new MainMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MainMessage instance
     */
    public static create(properties?: IMainMessage): MainMessage;

    /**
     * Encodes the specified MainMessage message. Does not implicitly {@link MainMessage.verify|verify} messages.
     * @param message MainMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMainMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MainMessage message, length delimited. Does not implicitly {@link MainMessage.verify|verify} messages.
     * @param message MainMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMainMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MainMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MainMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MainMessage;

    /**
     * Decodes a MainMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MainMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MainMessage;

    /**
     * Verifies a MainMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MainMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MainMessage
     */
    public static fromObject(object: { [k: string]: any }): MainMessage;

    /**
     * Creates a plain object from a MainMessage message. Also converts values to other types if specified.
     * @param message MainMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MainMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MainMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a DealCards_S2C. */
export class DealCards_S2C implements IDealCards_S2C {

    /**
     * Constructs a new DealCards_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDealCards_S2C);

    /** DealCards_S2C cards. */
    public cards: number[];

    /** DealCards_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new DealCards_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DealCards_S2C instance
     */
    public static create(properties?: IDealCards_S2C): DealCards_S2C;

    /**
     * Encodes the specified DealCards_S2C message. Does not implicitly {@link DealCards_S2C.verify|verify} messages.
     * @param message DealCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDealCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DealCards_S2C message, length delimited. Does not implicitly {@link DealCards_S2C.verify|verify} messages.
     * @param message DealCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDealCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DealCards_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DealCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DealCards_S2C;

    /**
     * Decodes a DealCards_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DealCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DealCards_S2C;

    /**
     * Verifies a DealCards_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DealCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DealCards_S2C
     */
    public static fromObject(object: { [k: string]: any }): DealCards_S2C;

    /**
     * Creates a plain object from a DealCards_S2C message. Also converts values to other types if specified.
     * @param message DealCards_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DealCards_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DealCards_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Ready_C2S. */
export class Ready_C2S implements IReady_C2S {

    /**
     * Constructs a new Ready_C2S.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReady_C2S);

    /** Ready_C2S seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new Ready_C2S instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Ready_C2S instance
     */
    public static create(properties?: IReady_C2S): Ready_C2S;

    /**
     * Encodes the specified Ready_C2S message. Does not implicitly {@link Ready_C2S.verify|verify} messages.
     * @param message Ready_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReady_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Ready_C2S message, length delimited. Does not implicitly {@link Ready_C2S.verify|verify} messages.
     * @param message Ready_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReady_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Ready_C2S message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Ready_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Ready_C2S;

    /**
     * Decodes a Ready_C2S message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Ready_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Ready_C2S;

    /**
     * Verifies a Ready_C2S message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Ready_C2S message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Ready_C2S
     */
    public static fromObject(object: { [k: string]: any }): Ready_C2S;

    /**
     * Creates a plain object from a Ready_C2S message. Also converts values to other types if specified.
     * @param message Ready_C2S
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Ready_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Ready_C2S to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a CompeteForLandLordRole_C2S. */
export class CompeteForLandLordRole_C2S implements ICompeteForLandLordRole_C2S {

    /**
     * Constructs a new CompeteForLandLordRole_C2S.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICompeteForLandLordRole_C2S);

    /** CompeteForLandLordRole_C2S score. */
    public score: number;

    /** CompeteForLandLordRole_C2S seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new CompeteForLandLordRole_C2S instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompeteForLandLordRole_C2S instance
     */
    public static create(properties?: ICompeteForLandLordRole_C2S): CompeteForLandLordRole_C2S;

    /**
     * Encodes the specified CompeteForLandLordRole_C2S message. Does not implicitly {@link CompeteForLandLordRole_C2S.verify|verify} messages.
     * @param message CompeteForLandLordRole_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICompeteForLandLordRole_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CompeteForLandLordRole_C2S message, length delimited. Does not implicitly {@link CompeteForLandLordRole_C2S.verify|verify} messages.
     * @param message CompeteForLandLordRole_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICompeteForLandLordRole_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CompeteForLandLordRole_C2S message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompeteForLandLordRole_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompeteForLandLordRole_C2S;

    /**
     * Decodes a CompeteForLandLordRole_C2S message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompeteForLandLordRole_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompeteForLandLordRole_C2S;

    /**
     * Verifies a CompeteForLandLordRole_C2S message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CompeteForLandLordRole_C2S message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompeteForLandLordRole_C2S
     */
    public static fromObject(object: { [k: string]: any }): CompeteForLandLordRole_C2S;

    /**
     * Creates a plain object from a CompeteForLandLordRole_C2S message. Also converts values to other types if specified.
     * @param message CompeteForLandLordRole_C2S
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CompeteForLandLordRole_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CompeteForLandLordRole_C2S to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a CompeteForLandLordRole_S2C. */
export class CompeteForLandLordRole_S2C implements ICompeteForLandLordRole_S2C {

    /**
     * Constructs a new CompeteForLandLordRole_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICompeteForLandLordRole_S2C);

    /** CompeteForLandLordRole_S2C curMaxScore. */
    public curMaxScore: number;

    /** CompeteForLandLordRole_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new CompeteForLandLordRole_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompeteForLandLordRole_S2C instance
     */
    public static create(properties?: ICompeteForLandLordRole_S2C): CompeteForLandLordRole_S2C;

    /**
     * Encodes the specified CompeteForLandLordRole_S2C message. Does not implicitly {@link CompeteForLandLordRole_S2C.verify|verify} messages.
     * @param message CompeteForLandLordRole_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICompeteForLandLordRole_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CompeteForLandLordRole_S2C message, length delimited. Does not implicitly {@link CompeteForLandLordRole_S2C.verify|verify} messages.
     * @param message CompeteForLandLordRole_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICompeteForLandLordRole_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CompeteForLandLordRole_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompeteForLandLordRole_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CompeteForLandLordRole_S2C;

    /**
     * Decodes a CompeteForLandLordRole_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompeteForLandLordRole_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CompeteForLandLordRole_S2C;

    /**
     * Verifies a CompeteForLandLordRole_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CompeteForLandLordRole_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompeteForLandLordRole_S2C
     */
    public static fromObject(object: { [k: string]: any }): CompeteForLandLordRole_S2C;

    /**
     * Creates a plain object from a CompeteForLandLordRole_S2C message. Also converts values to other types if specified.
     * @param message CompeteForLandLordRole_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CompeteForLandLordRole_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CompeteForLandLordRole_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PlayCards_C2S. */
export class PlayCards_C2S implements IPlayCards_C2S {

    /**
     * Constructs a new PlayCards_C2S.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayCards_C2S);

    /** PlayCards_C2S cards. */
    public cards: number[];

    /** PlayCards_C2S seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new PlayCards_C2S instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayCards_C2S instance
     */
    public static create(properties?: IPlayCards_C2S): PlayCards_C2S;

    /**
     * Encodes the specified PlayCards_C2S message. Does not implicitly {@link PlayCards_C2S.verify|verify} messages.
     * @param message PlayCards_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayCards_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayCards_C2S message, length delimited. Does not implicitly {@link PlayCards_C2S.verify|verify} messages.
     * @param message PlayCards_C2S message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayCards_C2S, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayCards_C2S message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayCards_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayCards_C2S;

    /**
     * Decodes a PlayCards_C2S message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayCards_C2S
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayCards_C2S;

    /**
     * Verifies a PlayCards_C2S message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayCards_C2S message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayCards_C2S
     */
    public static fromObject(object: { [k: string]: any }): PlayCards_C2S;

    /**
     * Creates a plain object from a PlayCards_C2S message. Also converts values to other types if specified.
     * @param message PlayCards_C2S
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayCards_C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayCards_C2S to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PlayCards_S2C. */
export class PlayCards_S2C implements IPlayCards_S2C {

    /**
     * Constructs a new PlayCards_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayCards_S2C);

    /** PlayCards_S2C cards. */
    public cards: number[];

    /** PlayCards_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new PlayCards_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayCards_S2C instance
     */
    public static create(properties?: IPlayCards_S2C): PlayCards_S2C;

    /**
     * Encodes the specified PlayCards_S2C message. Does not implicitly {@link PlayCards_S2C.verify|verify} messages.
     * @param message PlayCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayCards_S2C message, length delimited. Does not implicitly {@link PlayCards_S2C.verify|verify} messages.
     * @param message PlayCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayCards_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayCards_S2C;

    /**
     * Decodes a PlayCards_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayCards_S2C;

    /**
     * Verifies a PlayCards_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayCards_S2C
     */
    public static fromObject(object: { [k: string]: any }): PlayCards_S2C;

    /**
     * Creates a plain object from a PlayCards_S2C message. Also converts values to other types if specified.
     * @param message PlayCards_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayCards_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayCards_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an IllegalCards_S2C. */
export class IllegalCards_S2C implements IIllegalCards_S2C {

    /**
     * Constructs a new IllegalCards_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IIllegalCards_S2C);

    /** IllegalCards_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new IllegalCards_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns IllegalCards_S2C instance
     */
    public static create(properties?: IIllegalCards_S2C): IllegalCards_S2C;

    /**
     * Encodes the specified IllegalCards_S2C message. Does not implicitly {@link IllegalCards_S2C.verify|verify} messages.
     * @param message IllegalCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IIllegalCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified IllegalCards_S2C message, length delimited. Does not implicitly {@link IllegalCards_S2C.verify|verify} messages.
     * @param message IllegalCards_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IIllegalCards_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an IllegalCards_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns IllegalCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): IllegalCards_S2C;

    /**
     * Decodes an IllegalCards_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns IllegalCards_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): IllegalCards_S2C;

    /**
     * Verifies an IllegalCards_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an IllegalCards_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns IllegalCards_S2C
     */
    public static fromObject(object: { [k: string]: any }): IllegalCards_S2C;

    /**
     * Creates a plain object from an IllegalCards_S2C message. Also converts values to other types if specified.
     * @param message IllegalCards_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: IllegalCards_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this IllegalCards_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a GameEnd_S2C. */
export class GameEnd_S2C implements IGameEnd_S2C {

    /**
     * Constructs a new GameEnd_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameEnd_S2C);

    /** GameEnd_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new GameEnd_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameEnd_S2C instance
     */
    public static create(properties?: IGameEnd_S2C): GameEnd_S2C;

    /**
     * Encodes the specified GameEnd_S2C message. Does not implicitly {@link GameEnd_S2C.verify|verify} messages.
     * @param message GameEnd_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameEnd_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameEnd_S2C message, length delimited. Does not implicitly {@link GameEnd_S2C.verify|verify} messages.
     * @param message GameEnd_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameEnd_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameEnd_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameEnd_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameEnd_S2C;

    /**
     * Decodes a GameEnd_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameEnd_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameEnd_S2C;

    /**
     * Verifies a GameEnd_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameEnd_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameEnd_S2C
     */
    public static fromObject(object: { [k: string]: any }): GameEnd_S2C;

    /**
     * Creates a plain object from a GameEnd_S2C message. Also converts values to other types if specified.
     * @param message GameEnd_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameEnd_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameEnd_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PlayTurn_S2C. */
export class PlayTurn_S2C implements IPlayTurn_S2C {

    /**
     * Constructs a new PlayTurn_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayTurn_S2C);

    /** PlayTurn_S2C seatNumber. */
    public seatNumber: number;

    /**
     * Creates a new PlayTurn_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayTurn_S2C instance
     */
    public static create(properties?: IPlayTurn_S2C): PlayTurn_S2C;

    /**
     * Encodes the specified PlayTurn_S2C message. Does not implicitly {@link PlayTurn_S2C.verify|verify} messages.
     * @param message PlayTurn_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayTurn_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayTurn_S2C message, length delimited. Does not implicitly {@link PlayTurn_S2C.verify|verify} messages.
     * @param message PlayTurn_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayTurn_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayTurn_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayTurn_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayTurn_S2C;

    /**
     * Decodes a PlayTurn_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayTurn_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayTurn_S2C;

    /**
     * Verifies a PlayTurn_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayTurn_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayTurn_S2C
     */
    public static fromObject(object: { [k: string]: any }): PlayTurn_S2C;

    /**
     * Creates a plain object from a PlayTurn_S2C message. Also converts values to other types if specified.
     * @param message PlayTurn_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayTurn_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayTurn_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a GameStart_S2C. */
export class GameStart_S2C implements IGameStart_S2C {

    /**
     * Constructs a new GameStart_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameStart_S2C);

    /** GameStart_S2C seatNumber. */
    public seatNumber: number;

    /** GameStart_S2C playerId. */
    public playerId: number;

    /** GameStart_S2C playerCount. */
    public playerCount: number;

    /**
     * Creates a new GameStart_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameStart_S2C instance
     */
    public static create(properties?: IGameStart_S2C): GameStart_S2C;

    /**
     * Encodes the specified GameStart_S2C message. Does not implicitly {@link GameStart_S2C.verify|verify} messages.
     * @param message GameStart_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameStart_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameStart_S2C message, length delimited. Does not implicitly {@link GameStart_S2C.verify|verify} messages.
     * @param message GameStart_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameStart_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameStart_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameStart_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameStart_S2C;

    /**
     * Decodes a GameStart_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameStart_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameStart_S2C;

    /**
     * Verifies a GameStart_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameStart_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameStart_S2C
     */
    public static fromObject(object: { [k: string]: any }): GameStart_S2C;

    /**
     * Creates a plain object from a GameStart_S2C message. Also converts values to other types if specified.
     * @param message GameStart_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameStart_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameStart_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a BroadCastMsg_S2C. */
export class BroadCastMsg_S2C implements IBroadCastMsg_S2C {

    /**
     * Constructs a new BroadCastMsg_S2C.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBroadCastMsg_S2C);

    /** BroadCastMsg_S2C msg. */
    public msg: string;

    /**
     * Creates a new BroadCastMsg_S2C instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BroadCastMsg_S2C instance
     */
    public static create(properties?: IBroadCastMsg_S2C): BroadCastMsg_S2C;

    /**
     * Encodes the specified BroadCastMsg_S2C message. Does not implicitly {@link BroadCastMsg_S2C.verify|verify} messages.
     * @param message BroadCastMsg_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBroadCastMsg_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BroadCastMsg_S2C message, length delimited. Does not implicitly {@link BroadCastMsg_S2C.verify|verify} messages.
     * @param message BroadCastMsg_S2C message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBroadCastMsg_S2C, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BroadCastMsg_S2C message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BroadCastMsg_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BroadCastMsg_S2C;

    /**
     * Decodes a BroadCastMsg_S2C message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BroadCastMsg_S2C
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BroadCastMsg_S2C;

    /**
     * Verifies a BroadCastMsg_S2C message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BroadCastMsg_S2C message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BroadCastMsg_S2C
     */
    public static fromObject(object: { [k: string]: any }): BroadCastMsg_S2C;

    /**
     * Creates a plain object from a BroadCastMsg_S2C message. Also converts values to other types if specified.
     * @param message BroadCastMsg_S2C
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BroadCastMsg_S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BroadCastMsg_S2C to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
