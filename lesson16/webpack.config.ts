import type { Program } from 'typescript';
import regexInitTransformer from './transformers/regexInit.ts';
import randomValueReplaceTransformer from './transformers/random.ts';
import * as path from 'node:path';
import TSMacros from 'ts-macros';

// @ts-ignore
// @ts-ignore
export default {
    mode: "development",
    devtool: false,
    entry: "./src/index.ts",
    output: {
        path: path.resolve(import.meta.dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(import.meta.dirname, "tsconfig.json"),
                        getCustomTransformers: (program:Program) => ({
                            before: [
                                regexInitTransformer(program),
                                randomValueReplaceTransformer(),
                                //@ts-ignore
                                TSMacros.default(program)
                            ]
                        })
                    }
                }
            }
        ],

    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
}
