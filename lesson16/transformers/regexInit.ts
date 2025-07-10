import * as ts from "typescript";
const regex = /\/(.*)\/(.*)/i;

export default function regexInitTransformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context) => {
        return (sourceFile) => {
            return ts.visitNode(sourceFile, visitor) as ts.SourceFile;;

            function visitor(node: ts.Node): ts.Node {
                if (ts.isRegularExpressionLiteral(node)) {
                    const text = node.text;
                    const matches = regex.exec(text);
                    if (matches) {
                        const newText = `new RegExp('${matches[1]}', '${matches[2]}')`;
                        const factory = ts.factory;
                        return factory.createNewExpression(
                            factory.createIdentifier('RegExp'),
                            [],
                            [factory.createStringLiteral(matches[1]), factory.createStringLiteral(matches[2])]
                        );
                    }
                }
                
                return ts.visitEachChild(node, visitor, context);
            }
        };
    };
}
