type Mapper<T, U> = (value:T) => U;

class DataTransformer<T, U> {
    constructor(private readonly mapper:Mapper<T, U>) {
    }

    transform(value:T):U extends null ? null : U {
        return this.mapper(value);
    }
}

const toStringTransformer = new DataTransformer<number, string>(num => num.toString());
console.log(toStringTransformer.transform(42)); // "42"

const toNullTransformer = new DataTransformer<number, null>(() => null);
console.log(toNullTransformer.transform(42)); // null
