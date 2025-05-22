class ListProcessor<T = number> {
    private readonly list:T[];

    constructor(list:T[]) {
        this.list = list;
    }

    public getItems():T[] {
        return this.list;
    }

    public map<U>(callback: (item:T) => U): ListProcessor<U> {
        return new ListProcessor<U>(this.list.map(callback));
    }
}


const numberList = new ListProcessor([1, 2, 3]);
const stringList = numberList.map(num => num.toString());
console.log(stringList.getItems());
