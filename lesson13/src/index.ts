function cast<T>(a: any): T {
    return a;
}

type Length<T extends any[]> = T["length"];

type Head<A extends any[]> = A extends [infer H, ...any] ? H : never;
type Tail<A extends any[]> = A extends [any, ...infer T] ? T : [];

type RemoveNulls<
    A extends any[],
    R extends any[] = []
> = Length<A> extends 0 ?
    R :
    RemoveNulls<Tail<A>, Head<A> extends null|undefined ? R : [...R, Head<A>]>;

type Curry<P extends any[], R> = {
    'End': R;
    'DeepTo': (a: Head<P>) => Length<Tail<P>> extends 0 ? R : Curry<Tail<P>, R>;
}[Length<P> extends 0 ? 'End' : 'DeepTo'];

function curry<P extends any[], R>(f: (...a: P) => R): Curry<P, R> {
    return cast(
        function curried(this:unknown, ...args:any[]) {
            if (args.length >= f.length) {
                return f.apply(this, cast(args));
            }

            return function(this:unknown, ...args2:any[]) {
                return curried.call(this, ...args, ...args2);
            }
        }
    );
}

function min(a:number, b:string, c:number):number {
    return Math.min(a, parseFloat(b), c);
}

const curriedMin = curry(min);

curriedMin(1)('1')(3);

// const t:RemoveNulls<[undefined, 1, null, 2]> = [1, 2];
