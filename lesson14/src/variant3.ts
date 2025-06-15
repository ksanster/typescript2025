// With wildcards

import { Head, Tail } from './variant2';
import { User } from './variant1';

type EventList = [string, ...unknown[]][];

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
    : CompareTuples<ExtractToTuple<N>, ExtractToTuple<Head<L>[0]>> extends true
        ? Tail<Head<L>>
        : FindEvent<N, Tail<L>>

class EventEmitter<L extends EventList> {
    private handlers: Map<string, Set<Function>> = new Map();

    public on<E extends string>(event:E, handler: (...args:FindEvent<E, L>) => void ):void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }

        this.handlers.get(event)!.add(handler);
    }

    public off<E extends string>(event:E, handler?:(...args:FindEvent<E, L>) => void):void {
        if (!this.handlers.has(event)) {
            return;
        }

        if (!handler) {
            this.handlers.delete(event);
            return;
        }

        this.handlers.get(event)!.delete(handler);
    }

    public emit<E extends string>(event:E, ...args:FindEvent<E, L>):void {
        if (!this.handlers.has(event)) {
            return;
        }

        this.handlers.get(event)!.forEach((handler) => {
            handler(...args as any);
        })
    }
}

const emitter = new EventEmitter<[
    [`widget.${"button" | "link"}.${"click" | "dblclick"}`, id: number]
]>();

emitter.on('widget.*.click', (id: number) => {
    console.log(id);
});

emitter.on('widget.*.*', (id: number) => {
    console.log(id);
});

//@ts-expect-error
emitter.on('widget.*.*', (id: User) => {
    console.log(id);
});
