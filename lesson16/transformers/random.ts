import * as ts from "typescript";

export default function randomValueReplaceTransformer(): ts.TransformerFactory<ts.SourceFile> {
    return (context) => {
        return (sourceFile) => {
            return ts.visitNode(sourceFile, visitor) as ts.SourceFile;;

            function visitor(node: ts.Node): ts.Node {
                if (!ts.isCallExpression(node)) {
                    return ts.visitEachChild(node, visitor, context);
                }

                const child = node.getChildAt(0);
                const identifiers = child.getChildren();

                if (!ts.isPropertyAccessExpression(child) || identifiers.length < 3) {
                    return ts.visitEachChild(node, visitor, context);
                }

                const parentIdent = identifiers[0];
                const methodIdent = identifiers[2];


                if (parentIdent.getText() === 'Math' && methodIdent.getText() === 'random') {
                    const newValue = Math.random();
                    return ts.factory.createNumericLiteral(newValue);
                }

                return ts.visitEachChild(node, visitor, context);
            }
        };
    };
}
