{
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

    class Foo {
        test(a: B): void {
            a.sayB();
        }
    }

    class Foo2 extends Foo {
        test(a: C): void {
            a.sayC();
        }
    }

    class Foo3 extends Foo {
        test(a: A): void {
            a.sayA();
        }
    }

    const foo:Foo = new Foo2();
    foo.test(new B());
}

