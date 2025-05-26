import {EventEmitter} from 'node:events';

namespace part1 {
    type UserConstructor = {new (name: string, age: number): User};
    function LogClass(target:UserConstructor, ctx: ClassDecoratorContext<UserConstructor>) {
        return class extends target {
            constructor(name: string, age: number) {
                super(name, age);
                console.log(`Creating instance of User with arguments: ["${name}", ${age}]`);
            }
        }
    }

    @LogClass
    class User {
        constructor(public name: string, public age: number) {}
    }

    const user1 = new User("Alice", 25);
    const user2 = new User("Bob", 30);
}

namespace part2 {
    function once<This, Method extends (this:This) => any> (method: Method, context: ClassMethodDecoratorContext<This, Method>): (this: This) => any {
        const link = Symbol('cached');

        return function (this:any): any {
            if (!this[link]) {
                this[link] = method.apply(this);
            }

            return this[link];
        }
    };

    class User {
        @once
        getHashCode() {
            return Math.random();
        }
    }

    const bob = new User();

    console.log(bob.getHashCode()); // Везде одно и тоже значение
    console.log(bob.getHashCode());
    console.log(bob.getHashCode());
    console.log(bob.getHashCode());

}

namespace part3 {

    function cache<G extends (this:any) => V, V>(target:G, ctx:ClassGetterDecoratorContext) {
        const link = Symbol('cached');

        return function (this:any): any {
            if (!this[link]) {
                this[link] = target.call(this);
            }

            return this[link];
        }
    }

    function on(eventName:string) {
        return function<This extends Example, M extends (this:This) => void>(this:any, method:M, ctx: ClassMethodDecoratorContext<This, M>) {
            ctx.addInitializer(function (this:This) {
                this.ee.on(eventName, () => {
                    method.call(this);
                });
            });
        }
    }

    class Example {
        @cache get ee() {
            return new EventEmitter();
        }

        @on("boom")
        doSomething() {
            console.log("gotcha!");
        }
    }

    const sample = new Example();
    sample.ee.emit("kaboom");
    sample.ee.emit("boom");
}

namespace part4 {

    const PositiveInteger = function(num:number):boolean {
        return (num > 0 && Math.round(num) === num);
    }

    function validate(validator: (num:number) => boolean) {
        return function<This>(
            target: ClassAccessorDecoratorTarget<This, number>,
            ctx: ClassAccessorDecoratorContext<This, number>): ClassAccessorDecoratorResult<This, number> {
            return {
                init(this:This, value:number) {
                    if (!validator(value)) {
                        throw new Error(`Wrong value [${value}]. Only positive integers allowed!`);
                    }

                    return value;
                },

                set(this:This, value:number) {
                    if (!validator(value)) {
                        throw new Error(`Wrong value [${value}]. Only positive integers allowed!`);
                    }

                    target.set.call(this, value);
                },

                get(this:This): number {
                    return target.get.call(this);
                }
            }
        }
    }


    class Example {
        // Функция вернет true для любого положительного целого
        @validate(PositiveInteger) accessor lvl: number = 1;

        // accessor lvl: number = 0; вот так тоже ошибка
    }

    const a = new Example();

    // a.lvl = 0;     // Ошибка
    // a.lvl = -1;    // Ошибка
    // a.lvl = 2.343; // Ошибка
    a.lvl = 3;     // Все ок
}

namespace part5 {
    function validate(validator: (value:any) => boolean) {
        return function<This, Value>(property:undefined, ctx:ClassFieldDecoratorContext<This, Value>) {
            return function(this:This, value:Value) {
                if (!validator(value)) {
                    throw new Error(`Value [${JSON.stringify(value)}] not valid!`);
                }

                return value;
            }
        }
    }

    const localStorage = {
        getItem: (key:string): string | null => {
            if (key === 'Example.store') {
                return '{"name": "fromStorage"}';
            }

            return null;
        }
    }

    function fromLocalStorage<This extends {}, Value>(
        _target: undefined,
        ctx: ClassFieldDecoratorContext<This, Value>) {
        return function (this: This, value: Value) {
            const key = `${this.constructor.name}.${ctx.name.toString()}`;
            const item = localStorage.getItem(key);

            return item ? JSON.parse(item) : value;
        }
    }

    class Example {
        @validate(({age}) => typeof age === "number")
        @fromLocalStorage
        store: {name?: string; age?: any} = {age: 27};
    }

    const e = new Example();
    console.log(e.store);
}

namespace part6 {

}
