/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

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
  BROADCAST_MSG_S2C = 11,
  UNRECOGNIZED = -1,
}

export function cmdFromJSON(object: any): Cmd {
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

export function cmdToJSON(object: Cmd): string {
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

export interface MainMessage {
  cmdId: number;
  data: Uint8Array;
}

export interface DealCardsS2C {
  cards: number[];
  seatNumber: number;
}

export interface ReadyC2S {
  seatNumber: number;
}

export interface CompeteForLandLordRoleC2S {
  score: number;
  seatNumber: number;
}

export interface CompeteForLandLordRoleS2C {
  curMaxScore: number;
  seatNumber: number;
}

export interface PlayCardsC2S {
  cards: number[];
  seatNumber: number;
}

export interface PlayCardsS2C {
  cards: number[];
  seatNumber: number;
}

export interface IllegalCardsS2C {
  seatNumber: number;
}

export interface GameEndS2C {
  seatNumber: number;
}

export interface PlayTurnS2C {
  seatNumber: number;
}

export interface GameStartS2C {
  seatNumber: number;
  playerId: number;
  playerCount: number;
}

export interface BroadCastMsgS2C {
  msg: string;
}

function createBaseMainMessage(): MainMessage {
  return { cmdId: 0, data: new Uint8Array() };
}

export const MainMessage = {
  encode(
    message: MainMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cmdId !== 0) {
      writer.uint32(8).uint32(message.cmdId);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MainMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMainMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MainMessage {
    return {
      cmdId: isSet(object.cmdId) ? Number(object.cmdId) : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: MainMessage): unknown {
    const obj: any = {};
    message.cmdId !== undefined && (obj.cmdId = Math.round(message.cmdId));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MainMessage>, I>>(
    object: I
  ): MainMessage {
    const message = createBaseMainMessage();
    message.cmdId = object.cmdId ?? 0;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseDealCardsS2C(): DealCardsS2C {
  return { cards: [], seatNumber: 0 };
}

export const DealCardsS2C = {
  encode(
    message: DealCardsS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.cards) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.seatNumber !== 0) {
      writer.uint32(16).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DealCardsS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDealCardsS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cards.push(reader.uint32());
            }
          } else {
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

  fromJSON(object: any): DealCardsS2C {
    return {
      cards: Array.isArray(object?.cards)
        ? object.cards.map((e: any) => Number(e))
        : [],
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: DealCardsS2C): unknown {
    const obj: any = {};
    if (message.cards) {
      obj.cards = message.cards.map((e) => Math.round(e));
    } else {
      obj.cards = [];
    }
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DealCardsS2C>, I>>(
    object: I
  ): DealCardsS2C {
    const message = createBaseDealCardsS2C();
    message.cards = object.cards?.map((e) => e) || [];
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseReadyC2S(): ReadyC2S {
  return { seatNumber: 0 };
}

export const ReadyC2S = {
  encode(
    message: ReadyC2S,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seatNumber !== 0) {
      writer.uint32(8).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadyC2S {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadyC2S();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): ReadyC2S {
    return {
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: ReadyC2S): unknown {
    const obj: any = {};
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ReadyC2S>, I>>(object: I): ReadyC2S {
    const message = createBaseReadyC2S();
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseCompeteForLandLordRoleC2S(): CompeteForLandLordRoleC2S {
  return { score: 0, seatNumber: 0 };
}

export const CompeteForLandLordRoleC2S = {
  encode(
    message: CompeteForLandLordRoleC2S,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(8).uint32(message.score);
    }
    if (message.seatNumber !== 0) {
      writer.uint32(16).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CompeteForLandLordRoleC2S {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompeteForLandLordRoleC2S();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): CompeteForLandLordRoleC2S {
    return {
      score: isSet(object.score) ? Number(object.score) : 0,
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: CompeteForLandLordRoleC2S): unknown {
    const obj: any = {};
    message.score !== undefined && (obj.score = Math.round(message.score));
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CompeteForLandLordRoleC2S>, I>>(
    object: I
  ): CompeteForLandLordRoleC2S {
    const message = createBaseCompeteForLandLordRoleC2S();
    message.score = object.score ?? 0;
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseCompeteForLandLordRoleS2C(): CompeteForLandLordRoleS2C {
  return { curMaxScore: 0, seatNumber: 0 };
}

export const CompeteForLandLordRoleS2C = {
  encode(
    message: CompeteForLandLordRoleS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.curMaxScore !== 0) {
      writer.uint32(8).uint32(message.curMaxScore);
    }
    if (message.seatNumber !== 0) {
      writer.uint32(16).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CompeteForLandLordRoleS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompeteForLandLordRoleS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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
  },

  fromJSON(object: any): CompeteForLandLordRoleS2C {
    return {
      curMaxScore: isSet(object.curMaxScore) ? Number(object.curMaxScore) : 0,
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: CompeteForLandLordRoleS2C): unknown {
    const obj: any = {};
    message.curMaxScore !== undefined &&
      (obj.curMaxScore = Math.round(message.curMaxScore));
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CompeteForLandLordRoleS2C>, I>>(
    object: I
  ): CompeteForLandLordRoleS2C {
    const message = createBaseCompeteForLandLordRoleS2C();
    message.curMaxScore = object.curMaxScore ?? 0;
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBasePlayCardsC2S(): PlayCardsC2S {
  return { cards: [], seatNumber: 0 };
}

export const PlayCardsC2S = {
  encode(
    message: PlayCardsC2S,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.cards) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.seatNumber !== 0) {
      writer.uint32(16).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayCardsC2S {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayCardsC2S();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cards.push(reader.uint32());
            }
          } else {
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

  fromJSON(object: any): PlayCardsC2S {
    return {
      cards: Array.isArray(object?.cards)
        ? object.cards.map((e: any) => Number(e))
        : [],
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: PlayCardsC2S): unknown {
    const obj: any = {};
    if (message.cards) {
      obj.cards = message.cards.map((e) => Math.round(e));
    } else {
      obj.cards = [];
    }
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayCardsC2S>, I>>(
    object: I
  ): PlayCardsC2S {
    const message = createBasePlayCardsC2S();
    message.cards = object.cards?.map((e) => e) || [];
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBasePlayCardsS2C(): PlayCardsS2C {
  return { cards: [], seatNumber: 0 };
}

export const PlayCardsS2C = {
  encode(
    message: PlayCardsS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.cards) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.seatNumber !== 0) {
      writer.uint32(16).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayCardsS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayCardsS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cards.push(reader.uint32());
            }
          } else {
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

  fromJSON(object: any): PlayCardsS2C {
    return {
      cards: Array.isArray(object?.cards)
        ? object.cards.map((e: any) => Number(e))
        : [],
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: PlayCardsS2C): unknown {
    const obj: any = {};
    if (message.cards) {
      obj.cards = message.cards.map((e) => Math.round(e));
    } else {
      obj.cards = [];
    }
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayCardsS2C>, I>>(
    object: I
  ): PlayCardsS2C {
    const message = createBasePlayCardsS2C();
    message.cards = object.cards?.map((e) => e) || [];
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseIllegalCardsS2C(): IllegalCardsS2C {
  return { seatNumber: 0 };
}

export const IllegalCardsS2C = {
  encode(
    message: IllegalCardsS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seatNumber !== 0) {
      writer.uint32(8).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IllegalCardsS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIllegalCardsS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): IllegalCardsS2C {
    return {
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: IllegalCardsS2C): unknown {
    const obj: any = {};
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IllegalCardsS2C>, I>>(
    object: I
  ): IllegalCardsS2C {
    const message = createBaseIllegalCardsS2C();
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseGameEndS2C(): GameEndS2C {
  return { seatNumber: 0 };
}

export const GameEndS2C = {
  encode(
    message: GameEndS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seatNumber !== 0) {
      writer.uint32(8).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEndS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEndS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GameEndS2C {
    return {
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: GameEndS2C): unknown {
    const obj: any = {};
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEndS2C>, I>>(
    object: I
  ): GameEndS2C {
    const message = createBaseGameEndS2C();
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBasePlayTurnS2C(): PlayTurnS2C {
  return { seatNumber: 0 };
}

export const PlayTurnS2C = {
  encode(
    message: PlayTurnS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seatNumber !== 0) {
      writer.uint32(8).uint32(message.seatNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayTurnS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayTurnS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): PlayTurnS2C {
    return {
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
    };
  },

  toJSON(message: PlayTurnS2C): unknown {
    const obj: any = {};
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayTurnS2C>, I>>(
    object: I
  ): PlayTurnS2C {
    const message = createBasePlayTurnS2C();
    message.seatNumber = object.seatNumber ?? 0;
    return message;
  },
};

function createBaseGameStartS2C(): GameStartS2C {
  return { seatNumber: 0, playerId: 0, playerCount: 0 };
}

export const GameStartS2C = {
  encode(
    message: GameStartS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seatNumber !== 0) {
      writer.uint32(8).uint32(message.seatNumber);
    }
    if (message.playerId !== 0) {
      writer.uint32(16).uint32(message.playerId);
    }
    if (message.playerCount !== 0) {
      writer.uint32(24).uint32(message.playerCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameStartS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameStartS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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
  },

  fromJSON(object: any): GameStartS2C {
    return {
      seatNumber: isSet(object.seatNumber) ? Number(object.seatNumber) : 0,
      playerId: isSet(object.playerId) ? Number(object.playerId) : 0,
      playerCount: isSet(object.playerCount) ? Number(object.playerCount) : 0,
    };
  },

  toJSON(message: GameStartS2C): unknown {
    const obj: any = {};
    message.seatNumber !== undefined &&
      (obj.seatNumber = Math.round(message.seatNumber));
    message.playerId !== undefined &&
      (obj.playerId = Math.round(message.playerId));
    message.playerCount !== undefined &&
      (obj.playerCount = Math.round(message.playerCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameStartS2C>, I>>(
    object: I
  ): GameStartS2C {
    const message = createBaseGameStartS2C();
    message.seatNumber = object.seatNumber ?? 0;
    message.playerId = object.playerId ?? 0;
    message.playerCount = object.playerCount ?? 0;
    return message;
  },
};

function createBaseBroadCastMsgS2C(): BroadCastMsgS2C {
  return { msg: "" };
}

export const BroadCastMsgS2C = {
  encode(
    message: BroadCastMsgS2C,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadCastMsgS2C {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadCastMsgS2C();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): BroadCastMsgS2C {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
    };
  },

  toJSON(message: BroadCastMsgS2C): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BroadCastMsgS2C>, I>>(
    object: I
  ): BroadCastMsgS2C {
    const message = createBaseBroadCastMsgS2C();
    message.msg = object.msg ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
