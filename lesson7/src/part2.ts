class Wrapper<T> {
    constructor(public value:T) { }
}

class A {
    sayA() {
        console.log("A");
    }
}


class B extends A {
    sayB() {
        console.log("B");
    }
}

class C extends B {
    sayC() {
        console.log("C");
    }
}

function copyFrom<T, U extends T>(a:Wrapper<U>, b:Wrapper<T>):void {
    b.value = a.value;
}

{
    const a = new Wrapper(new A());
    const b = new Wrapper(new B());
    const c = new Wrapper(new C());

    // @ts-expect-error
    copyFrom(a, b);

    copyFrom(b, a); // Все ок
    copyFrom(c, b); // Все ок
}
