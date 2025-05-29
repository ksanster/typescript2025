import * as TsToolbelt from "ts-toolbelt"

declare global {
    export import StolenTools = TsToolbelt;
}

type Test = StolenTools.Any.Contains<'b', 'a' | 'b'>
const t:Test = 1;

console.log(t);
