class CoVariantWrapper<out T> {
    constructor(public value:T) { }
}


{
    let a = new CoVariantWrapper(new A());
    let b = new CoVariantWrapper(new B());
    let c = new CoVariantWrapper(new C());

    a = b; // Все ок

    // @ts-expect-error
    c = b;
}
