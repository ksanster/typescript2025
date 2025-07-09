import type { Program } from 'typescript';
import regexInitTransformer from './transformers/regexInit.ts';
import * as path from 'node:path';

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
                                regexInitTransformer(program)
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
