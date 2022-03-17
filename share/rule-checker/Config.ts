
import { T_TYPE_DATA, E_META, E_FACE } from "./Const";

export const StandardSerialArr = [
    0x03, 0x13, 0x23, 0x33,
    0x04, 0x14, 0x24, 0x34,
    0x05, 0x15, 0x25, 0x35,
    0x06, 0x16, 0x26, 0x36,
    0x07, 0x17, 0x27, 0x37,
    0x08, 0x18, 0x28, 0x38,
    0x09, 0x19, 0x29, 0x39,
    0x0A, 0x1A, 0x2A, 0x3A,
    0x0B, 0x1B, 0x2B, 0x3B,
    0x0C, 0x1C, 0x2C, 0x3C,
    0x0D, 0x1D, 0x2D, 0x3D,
    0x01, 0x11, 0x21, 0x31,
    0x02, 0x12, 0x22, 0x32,
    0x4E, 0x4F
]

export const FaceSerialsDic: { [face in E_FACE]?: number[] } = {
    [E_FACE.THREE]: [0x03, 0x13, 0x23, 0x33],
    [E_FACE.FOUR]: [0x04, 0x14, 0x24, 0x34],
    [E_FACE.FIVE]: [0x05, 0x15, 0x25, 0x35],
    [E_FACE.SIX]: [0x06, 0x16, 0x26, 0x36],
    [E_FACE.SEVEN]: [0x07, 0x17, 0x27, 0x37],
    [E_FACE.EIGHT]: [0x08, 0x18, 0x28, 0x38],
    [E_FACE.NINE]: [0x09, 0x19, 0x29, 0x39],
    [E_FACE.TEN]: [0x0A, 0x1A, 0x2A, 0x3A],
    [E_FACE.JACK]: [0x0B, 0x1B, 0x2B, 0x3B],
    [E_FACE.QUEEN]: [0x0C, 0x1C, 0x2C, 0x3C],
    [E_FACE.KING]: [0x0D, 0x1D, 0x2D, 0x3D],
    [E_FACE.ACE]: [0x01, 0x11, 0x21, 0x31],
    [E_FACE.DEUCE]: [0x02, 0x12, 0x22, 0x32],
    [E_FACE.B_JOKER]: [0x4E],
    [E_FACE.R_JOKER]: [0x4F],
}

export const ValueDic = {
    [E_FACE.THREE]: 3,
    [E_FACE.FOUR]: 4,
    [E_FACE.FIVE]: 5,
    [E_FACE.SIX]: 6,
    [E_FACE.SEVEN]: 7,
    [E_FACE.EIGHT]: 8,
    [E_FACE.NINE]: 9,
    [E_FACE.TEN]: 10,
    [E_FACE.JACK]: 11,
    [E_FACE.QUEEN]: 12,
    [E_FACE.KING]: 13,
    [E_FACE.ACE]: 14,
    [E_FACE.DEUCE]: 15,
    [E_FACE.B_JOKER]: 16,
    [E_FACE.R_JOKER]: 17
}

export const ValueCountDic = {
    [ValueDic[E_FACE.THREE]]: FaceSerialsDic[E_FACE.THREE].length,
    [ValueDic[E_FACE.FOUR]]: FaceSerialsDic[E_FACE.FOUR].length,
    [ValueDic[E_FACE.FIVE]]: FaceSerialsDic[E_FACE.FIVE].length,
    [ValueDic[E_FACE.SIX]]: FaceSerialsDic[E_FACE.SIX].length,
    [ValueDic[E_FACE.SEVEN]]: FaceSerialsDic[E_FACE.SEVEN].length,
    [ValueDic[E_FACE.EIGHT]]: FaceSerialsDic[E_FACE.EIGHT].length,
    [ValueDic[E_FACE.NINE]]: FaceSerialsDic[E_FACE.NINE].length,
    [ValueDic[E_FACE.TEN]]: FaceSerialsDic[E_FACE.TEN].length,
    [ValueDic[E_FACE.JACK]]: FaceSerialsDic[E_FACE.JACK].length,
    [ValueDic[E_FACE.QUEEN]]: FaceSerialsDic[E_FACE.QUEEN].length,
    [ValueDic[E_FACE.KING]]: FaceSerialsDic[E_FACE.KING].length,
    [ValueDic[E_FACE.ACE]]: FaceSerialsDic[E_FACE.ACE].length,
    [ValueDic[E_FACE.DEUCE]]: FaceSerialsDic[E_FACE.DEUCE].length,
    [ValueDic[E_FACE.B_JOKER]]: FaceSerialsDic[E_FACE.B_JOKER].length,
    [ValueDic[E_FACE.R_JOKER]]: FaceSerialsDic[E_FACE.R_JOKER].length
}

export enum E_TYPE {
    ERROR,
    DOUBLE_JOKER,
    QUADRUPLE,
    SINGLE,
    DOUBLE,
    TRIPLE,
    SINGLE_ORDER,
    DOUBLE_ORDER,
    TRIPLE_ORDER,
    TRIPLE_TAKE_ONE,
    TRIPLE_TAKE_TWO,
    TRIPLE_ORDER_TAKE_ONE,
    TRIPLE_ORDER_TAKE_TWO,
    QUADRUPLE_TAKE_TWO_SINGLE,
    QUADRUPLE_TAKE_TWO_DOUBLE
}

export enum E_TYPE_LEVEL {
    NONE,
    ONE,
    TWO,
    TOP
}

export const TypeLevelDic: { [level: number]: E_TYPE[] } = {
    [E_TYPE_LEVEL.ONE]: [
        E_TYPE.SINGLE,
        E_TYPE.DOUBLE,
        E_TYPE.TRIPLE,
        E_TYPE.SINGLE_ORDER,
        E_TYPE.DOUBLE_ORDER,
        E_TYPE.TRIPLE_ORDER,
        E_TYPE.TRIPLE_TAKE_ONE,
        E_TYPE.TRIPLE_TAKE_TWO,
        E_TYPE.TRIPLE_ORDER_TAKE_ONE,
        E_TYPE.TRIPLE_ORDER_TAKE_TWO,
        E_TYPE.QUADRUPLE_TAKE_TWO_SINGLE,
        E_TYPE.QUADRUPLE_TAKE_TWO_DOUBLE,
    ],
    [E_TYPE_LEVEL.TWO]: [
        E_TYPE.QUADRUPLE
    ],
    [E_TYPE_LEVEL.TOP]: [
        E_TYPE.DOUBLE_JOKER
    ]
}

export const TypeDefinition: { [type: number]: T_TYPE_DATA } = {
    [E_TYPE.SINGLE]: { metaType: E_META.ONE, count: 1 },
    [E_TYPE.DOUBLE]: { metaType: E_META.TWO, count: 1 },
    [E_TYPE.TRIPLE]: { metaType: E_META.THREE, count: 1 },
    [E_TYPE.SINGLE_ORDER]: { metaType: E_META.ONE, minCount: 5, increment: true },
    [E_TYPE.DOUBLE_ORDER]: { metaType: E_META.TWO, minCount: 3, increment: true },
    [E_TYPE.TRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, increment: true },
    [E_TYPE.TRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, increment: true },
    [E_TYPE.TRIPLE_ORDER_TAKE_ONE]: {
        metaType: E_META.THREE, minCount: 2, increment: true,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_TYPE.TRIPLE_ORDER_TAKE_TWO]: {
        metaType: E_META.THREE, minCount: 2, increment: true,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_TYPE.TRIPLE_TAKE_ONE]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_TYPE.TRIPLE_TAKE_TWO]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_TYPE.QUADRUPLE_TAKE_TWO_SINGLE]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 2 }
    },
    [E_TYPE.QUADRUPLE_TAKE_TWO_DOUBLE]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 2 }
    },
    [E_TYPE.QUADRUPLE]: { metaType: E_META.FOUR, count: 1 },
    [E_TYPE.DOUBLE_JOKER]: { metaType: E_META.ONE, count: 2, val: [FaceSerialsDic[E_FACE.B_JOKER][0], FaceSerialsDic[E_FACE.R_JOKER][0]] }
}

export const OrderTopLimitVal: number = ValueDic[E_FACE.ACE];
export const LimitOrderTypeArr: E_TYPE[] = [
    E_TYPE.SINGLE_ORDER,
    E_TYPE.DOUBLE_ORDER,
    E_TYPE.TRIPLE_ORDER,
    E_TYPE.TRIPLE_ORDER,
    E_TYPE.TRIPLE_ORDER_TAKE_ONE,
    E_TYPE.TRIPLE_ORDER_TAKE_TWO
]