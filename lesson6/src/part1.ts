function pair<T, U>(a:T, b:U): { first:T, second:U } {
    return {
        first: a,
        second: b
    }
}

const pair1 = pair('hello', 1);
console.log(pair1);

const pair2 = pair(100, true);
console.log(pair2);
