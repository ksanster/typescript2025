function sum(a: number, b: number): number;
function sum(a: bigint, b: bigint): bigint;
function sum(a: string, b: string): string;

function sum(a: any, b: any) {
    return a + b;
}

type AddThisParameter<Func extends (a:any, b:any) => any, ThisObject> = Func extends {
    (a:number, b:number): number;
    (a:bigint, b:bigint): bigint;
    (a:string, b:string): string;
}
    ? (
        ((this:ThisObject, a:number, b:number) => number)
        | ((this:ThisObject, a:bigint, b:bigint) => bigint)
        | ((this:ThisObject, a:string, b:string) => string)
      )
    : never;


type ThisSum = AddThisParameter<typeof sum, object>;

function res(this:{}, a:string, b:string) {
    console.log(this);
    return a + b;
}

const ts:ThisSum = res;
