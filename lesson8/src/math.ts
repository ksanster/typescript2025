// Многие краевые случаи не учтены. В том же type-fest подобные типы гораздо более многоэтажны

namespace MathUtils {
    export type Length<T extends any[]> = T['length'];
    export type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false;
    export type Abs<T extends number> = IsNegative<T> extends true ? Negate<T> : T;

    type IsSameSign<A extends number, B extends number> = IsNegative<A> extends true
        ? IsNegative<B> extends true ? true : false
        : IsNegative<B> extends true ? false : true;

    type SimpleBiggerOrEqual<A extends number, B extends number> =
        BuildTuple<A> extends [...BuildTuple<B>, ...any] ? true : false;

    type Negate<T extends number> =
        `-${T}` extends `${infer V extends number}` ? V :
            `${T}` extends `-${infer V extends number}` ? V : 0;

    type BuildTuple<L extends number, Acc extends any[] = []> = IsNegative<L> extends true
        ? BuildTuple<Negate<L>, Acc>
        : Length<Acc> extends L
            ? Acc
            : BuildTuple<L, [...Acc, any]>;

    // Сложение положительных чисел
    type SimpleAdd<A extends number, B extends number> =
        Length<[...BuildTuple<A>, ...BuildTuple<B>]> extends infer Result extends number
            ? Result
            : never;

    // Вычитание положительных чисел
    type SimpleSub<A extends number, B extends number> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? Length<R>
        : BuildTuple<B> extends [...BuildTuple<A>, ...infer R] ? Negate<Length<R>> : 0;

    export type Sub<A extends number, B extends number> = IsNegative<A> extends false
        ? IsNegative<B> extends false ? SimpleSub<A, B> : SimpleAdd<A, B>
        : IsNegative<B> extends false ? Negate<SimpleAdd<A, B>> : SimpleSub<B, A>;


    export type Add<A extends number, B extends number> = IsNegative<A> extends true
        ? IsNegative<B> extends true
            ? Negate<SimpleAdd<Negate<A>, Negate<B>>>
            : SimpleSub<B, Negate<A>>
        : IsNegative<B> extends true
            ? SimpleSub<A, Negate<B>>
            : SimpleAdd<A, B>;


    type SimpleMultiply<A extends number, B extends number, Result extends number = 0, Acc extends any[] = []> =
        Length<Acc> extends B ? Result : SimpleMultiply<A, B, SimpleAdd<A, Result>, [...Acc, any]>;

    export type Multiply<A extends number, B extends number> = IsSameSign<A, B> extends true
        ? SimpleMultiply<Abs<A>, Abs<B>> : Negate<SimpleMultiply<Abs<A>, Abs<B>>>


    type SimpleDivide<A extends number, B extends number, SubResult extends number = A, Acc extends any[] = []> =
        SimpleBiggerOrEqual<SubResult, B> extends false
            ? Length<Acc> extends 0 ? A : Length<Acc>
            : SimpleDivide<A, B, SimpleSub<SubResult, B>, [...Acc, any]>;

    export type Divide<A extends number, B extends number> = IsSameSign<A, B> extends true
        ? SimpleDivide<Abs<A>, Abs<B>> : Negate<SimpleDivide<Abs<A>, Abs<B>>>;

    export type Pow<A extends number, B extends number, Result extends number = 1, Acc extends any[] = []> =
        Length<Acc> extends B ? Result : Pow<A, B, Multiply<A, Result>, [...Acc, any]>;

}

const a1: MathUtils.Add<-5, -3> = -8;
const a2: MathUtils.Add<5, -3> = 2;

const a3: MathUtils.Sub<-5, -3> = -2;
const a4: MathUtils.Sub<-5, 3> = -8;

const m1:MathUtils.Multiply<-5, 2> = -10;
const m2:MathUtils.Multiply<-5, -3> = 15;

const d1: MathUtils.Divide<10, 2> = 5;
const d2: MathUtils.Divide<5, -3> = -1;

const p1: MathUtils.Pow<-5, 2> = 25;
const p2: MathUtils.Pow<-5, 3> = -125;
