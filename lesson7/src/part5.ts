class ContrVariantWrapper<in T> {
    constructor(public value:T) { }
}

{
    let a = new ContrVariantWrapper(new A());
    let b = new ContrVariantWrapper(new B());
    let c = new ContrVariantWrapper(new C());


    // @ts-expect-error
    a = b;

    // @ts-expect-error
    c = b;
}
