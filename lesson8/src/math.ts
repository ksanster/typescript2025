namespace MathUtils {
    export type Length<T extends any[]> = T['length'];
    export type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false;
    type Negate<T extends number> =
        `-${T}` extends `${infer V extends number}` ? V :
            `${T}` extends `-${infer V extends number}` ? V : 0;

    export type Abs<T extends number> = IsNegative<T> extends true ? Negate<T> : T;

    type BuildTuple<L extends number, Acc extends any[] = []> = IsNegative<L> extends true
        ? BuildTuple<Negate<L>, Acc>
        : Length<Acc> extends L
            ? Acc
            : BuildTuple<L, [...Acc, any]>;

    // Сложение положительных чисел
    type PositiveAdd<A extends number, B extends number> =
        Length<[...BuildTuple<A>, ...BuildTuple<B>]> extends infer Result extends number
            ? Result
            : never;

    // Вычитание положительных чисел
    type PositiveSub<A extends number, B extends number> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? Length<R>
        : BuildTuple<B> extends [...BuildTuple<A>, ...infer R] ? Negate<Length<R>> : 0

    export type Sub<A extends number, B extends number> = IsNegative<A> extends false
        ? IsNegative<B> extends false ? PositiveSub<A, B> : PositiveAdd<A, B>
        : IsNegative<B> extends false ? Negate<PositiveAdd<A, B>> : PositiveSub<B, A>


    export type Add<A extends number, B extends number> = IsNegative<A> extends true
        ? IsNegative<B> extends true
            ? Negate<PositiveAdd<Negate<A>, Negate<B>>>
            : PositiveSub<B, Negate<A>>
        : IsNegative<B> extends true
            ? PositiveSub<A, Negate<B>>
            : PositiveAdd<A, B>

}

const a1:MathUtils.Add<3, 1> = 4;
const a2:MathUtils.Add<3, -1> = 2;
const a3:MathUtils.Add<-3, -1> = -4;

const s1:MathUtils.Sub<3, 1> = 2;
const s2:MathUtils.Sub<3, -1> = 4;
const s3:MathUtils.Sub<-3, -1> = -2;
