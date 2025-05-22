interface MyStorage<T> {
    add(item:T):void;
    getAll():T[];
}

class MemoryStorage<T> implements MyStorage<T> {
    private store: T[] = [];

    add(item:T):void {
        if (this.store.includes(item)) {
            return;
        }

        this.store.push(item);
    }

    getAll(): T[] {
        return this.store;
    }
}

const stringStorage = new MemoryStorage<string>();
stringStorage.add('apple');
stringStorage.add('banana');

console.log(stringStorage.getAll());
