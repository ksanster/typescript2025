// К сожалению тема осталась частично непонятой
// Перегрузки для типовых функций выглядят как грязный хак.
// Из чего выводить необходимое количество перегрузок - непонятно (эмпирически - количество перегрузок в интерфейсе + 1)
// Даже финальные версии от преподавателя периодически подвешивают IDE и выдают ошибку бесконечной рекурсии

type TypedMap<Scheme, M extends Map<any, any> = Map<unknown, unknown>> = Scheme & M;

type Head<A extends any[]> = A extends [infer H, ...any] ? H : never;

type Tail<A extends any[]> = A extends [any, ...infer Tail] ? Tail : [];

type Reverse<A extends any[], R extends any[] = []> = A extends [] ? R : Reverse<Tail<A>, [Head<A>, ...R]>

type ExtractMapOverloads<M> = M extends {
    get(key: infer K1): infer V1;
    get(key: infer K2): infer V2;
    get(key: infer K3): infer V3;
    get(key: infer K4): infer V4;
} ? [[K1, V1], [K2, V2], [K3, V3], [K4, V4]] : [];

type GetFromTuple<A extends any[], V> =
    A extends [] ? never :
        V extends Head<A>[0] ? Head<A>[1] : GetFromTuple<Tail<A>, V>;

type HasGet<M> = M extends {get(key: any): any} ? true : false;

type GetFromMap<M, P extends any[]> = {
    ByValue: M;
    FromObject: never;
    ByPath: GetFromMap<GetFromTuple<ExtractMapOverloads<M>, Head<P>>, Tail<P>>;
}[P extends [] ? "ByValue" : HasGet<M> extends true ? "ByPath" : "FromObject"];

function getFromMap<M, const P extends any[] | []>(
    map: M,
    path: P
): GetFromMap<M, P> {
    return null as any;
}

//хнык
function setToMap<M, const P extends any[] | []>(map:M, path: P, value: GetFromMap<M, P>):void {
    //Do something
}

interface Bla {
    a: 1
}

namespace Store {
    export type User = {
        name: string
    }

    export type Picture = {
        url: string,
        size: number
    }

    export interface Storable {
        get(key: 'user'):User;
        get(key: 'picture'):Picture;
        get(key: 'child'):TypedMap<Store.Storable>;
        // get(key: '2'):string;
    }
}

const map:TypedMap<Store.Storable> = new Map();

let map1!:Store.Storable;

const a = getFromMap(map, ['child', 'child', '1']);
const b = getFromMap(map1, ['picture']);

// setToMap(map, ['user'], { name: 'Bob' });
