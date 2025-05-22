interface Comparable {
    valueOf():number;
}

class DataComparer {
    compare<T extends Comparable>(a:T, b:T): number {
        if (a.valueOf() < b.valueOf()) {
            return -1;
        } else if (a.valueOf() > b.valueOf()) {
            return 1;
        }

        return 0;
    }
}

class Person implements Comparable {
    public readonly age: number;
    constructor(public age: number) {
        this.age = age;
    }

    valueOf() {
        return this.age;
    }
}

const comparer = new DataComparer();
console.log(comparer.compare(new Person(30), new Person(25))); // 1
