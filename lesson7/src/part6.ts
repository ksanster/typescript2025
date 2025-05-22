class Wrapper2<in out T1, out T2> {
    constructor(public value1:T1, public value2:T2) { }
}

{
    let a = new Wrapper2(new A(), new A());
    let b = new Wrapper2(new A(), new B());
    let c = new Wrapper2(new B(), new B());

    a = b; // Все ок

// @ts-expect-error
    a = c;
}
