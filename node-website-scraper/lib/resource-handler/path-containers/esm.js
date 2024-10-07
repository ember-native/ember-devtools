import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
console.log(traverse)

class EsmImports {
	constructor (text) {
		this.text = text || '';
		let ast;
		try {
			ast = parser.parse(text, {sourceType: 'module'});
		} catch (e) {
			console.log('failed on', text, e);
			throw e;
		}

    let paths = [];
		this.paths = paths;
    traverse.default(ast, {
      ImportDeclaration: function(path) {
        paths.push(path.node.source.value);
      },
			ImportExpression: function (path) {
				console.log('ImportExpression', path.node.source.value);
				paths.push(path.node.source.value);
			},
			CallExpression: function (path) {
				if(path.node.callee.name === 'import') {
					console.log(path.node)
				}
				if (path.node.callee.type === 'Import' && path.node.arguments[0].type === 'StringLiteral') {
					paths.push(path.node.arguments[0].value);
				}
			},
			NewExpression: function (path) {
				if (path.node.callee.name === 'URL' && path.node.arguments[0].type === 'StringLiteral') {
					paths.push(path.node.arguments[0].value);
				}
			}
    });
    console.log(this.paths);
	}

	getPaths () {
		return this.paths;
	}

	updateText (pathsToUpdate) {
		return this.text;
	}
}

export default EsmImports;
