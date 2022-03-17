export type T_CHECK_RES = {
    arr: number[];
}
export enum E_META {
    NONE,
    ONE,
    TWO,
    THREE,
    FOUR
}
/**
 * - property count and minCount won't exist at the same time
**/
export type T_TYPE_DATA = {
    metaType?: E_META,
    count?: number,
    minCount?: number,
    increment?: boolean,
    val?: number[],
    subTypeData?: { metaType: E_META, count: number }
}
export type T_VALUE_ITEM = {
    value: number,
    count: number,
    arr: number[]
}

export enum E_FACE {
    ACE = 1,
    DEUCE,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    B_JOKER,
    R_JOKER
}

export enum E_SUIT {
    NONE,
    DIAMONDS,
    CLUBS,
    HEARTS,
    SPADES,
    B_JOKER,
    R_JOKER
}