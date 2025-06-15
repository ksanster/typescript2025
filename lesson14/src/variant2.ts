import { User } from './variant1';

type EventList = [string, ...unknown[]][];
type EventHash = Record<string, unknown[]>;

export type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
export type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;

type ExtractToTuple<S extends string, R extends string[] = []> = S extends ''
    ? R
    : S extends`${infer U}.${infer T}`
        ? ExtractToTuple<T, [...R, U]>
        : [...R, S];

type CompareTuples<T1 extends string[], T2 extends string[]> = T1['length'] extends 0
    ? true
    : Head<T1> extends (Head<T2> | '*')
        ? CompareTuples<Tail<T1>, Tail<T2>>
        : Head<T2> extends (Head<T1> | '*')
            ? CompareTuples<Tail<T1>, Tail<T2>>
            : false;


type FindEvent<N extends string, L extends EventList> = L['length'] extends 0
    ? never
    : N extends Head<L>[0]
        ? Tail<Head<L>>
        : FindEvent<N, Tail<L>>


type ResolveEvents<E extends EventList, R extends EventHash = {}> = E['length'] extends 0
    ? R
    : ResolveEvents<Tail<E>, R & {[K in Head<E>[0]]: FindEvent<K, E>}>

class EventEmitter<L extends EventList, Events extends EventHash = ResolveEvents<L>> {
    private handlers: Map<string, Set<Function>> = new Map();

    public on<E extends keyof Events & string>(event:E, handler: (...args:Events[E]) => void ):void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }

        this.handlers.get(event)!.add(handler);
    }

    public off<E extends keyof Events & string>(event:E, handler?:(...args:Events[E]) => void):void {
        if (!this.handlers.has(event)) {
            return;
        }

        if (!handler) {
            this.handlers.delete(event);
            return;
        }

        this.handlers.get(event)!.delete(handler);
    }

    public emit<E extends keyof Events & string>(event:E, ...args:Events[E]):void {
        if (!this.handlers.has(event)) {
            return;
        }

        this.handlers.get(event)!.forEach((handler) => {
            handler(...args as any);
        })
    }
}

const emitter = new EventEmitter<[
    ['add', user: User],
    ['remove', id: number],
    [`on${'Change' | 'Update'}`, id: number, name: string]
]>();

emitter.on('onChange', (id, name) => {
    console.log(id, name);
});

emitter.on('add', (user) => {
    console.log(user);
})

emitter.on('remove', (id) => {
    console.log(id);
});
