type IterableElement<T> = T extends Iterable<infer V> ? V : T;
type AsyncIterableElement<T> = T extends AsyncIterable<infer V> ? V : T;
type AnyIterableType<T> = T extends Iterable<infer V>
    ? V
    : T extends AsyncIterable<infer V> ? V : T;

async function* gen() {
    yield* [1, "Foo", 3, 4];
}

const a:IterableElement<[1, 2, 3, '1']> = 1;
const b:IterableElement<Set<boolean>> = true;
const c:AsyncIterableElement<ReturnType<typeof gen>> = "Foo1";
// @ts-expect-error
const d:AsyncIterableElement<[1, 1, 5]> = 1;

const e:AnyIterableType<[1, 1, 5]> = 1;

const f:AnyIterableType<ReturnType<typeof gen>> = 112;
