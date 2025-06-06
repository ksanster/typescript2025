type ToStr<T> = Extract<T, string>;

type Get<O, P> = {
    ByProp: P extends keyof O ? O[P] : never;
    ByPath: P extends `${infer Prop}.${infer Rest}` ? Prop extends keyof O ? Get<O[Prop], Rest> : never : never;
}[P extends `${string}.${string}` ? 'ByPath' : 'ByProp'];

type Path<O, R = ''> = {
    Initial: Path<O[keyof O], keyof O | `${ToStr<keyof O>}.${ToStr<keyof O>}`>;
    Recursive : Path<O[keyof O], R | `${ToStr<R>}.${ToStr<keyof O[keyof O]>}`>;
    Result: R;
}[    O extends never
    ? 'Result'
    : keyof O extends never
        ? 'Result'
        : O[keyof O] extends PropertyKey
            ? 'Result'
            : R extends ''
                ? 'Initial'
                : 'Recursive'
    ];


function get<O, const P extends string>(obj: O, path: P): Get<O, P> {
    return null as any;
}

function set<O, const P extends string>(obj: O, path: P, value: Get<O, P>) {}

get({a: {b: {c: 1}}}, 'a.b.c');

set({a: {b: {c: 1}}}, 'a.b.c', 42);
