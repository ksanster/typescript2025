class InVariantWrapper<in out T> {
    constructor(public value:T) { }
}

{
    let a = new InVariantWrapper(new A());
    let b = new InVariantWrapper(new B());
    let c = new InVariantWrapper(new C());

    // @ts-expect-error
    a = b;
    // @ts-expect-error
    c = b;
}
