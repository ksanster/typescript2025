export {}

declare global {
    export interface Number {
        say42():void
    }

    export var foo:string;
}

Number.prototype.say42 = () => {
    console.log(42);
};

globalThis.foo = "bar";


const num = 12;
num.say42();
