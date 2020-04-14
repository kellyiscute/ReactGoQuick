// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let commandCreateComponent = vscode.commands.registerCommand('react-ext.CreateComponent', () => {
		let inputbox = vscode.window.createInputBox()
		inputbox.prompt = 'asdf'

		inputbox.onDidAccept(() => {
			inputbox.hide()

			let wsEdit = new vscode.WorkspaceEdit()
			// console.log(vscode.workspace.workspaceFolders[0])
			let file = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + '/src/components/' + inputbox.value + '.js')
			// console.log(file.path)
			wsEdit.createFile(file)

			vscode.workspace.applyEdit(wsEdit)
			.then(() => vscode.workspace.openTextDocument(file))
			.then((doc) => vscode.window.showTextDocument(doc))
			.then((editor) => {
				editor.edit((editBuilder) => {
					editBuilder.insert(new vscode.Position(0,0), "import React from 'react'\n\nfunction " + inputbox.value + "(props) {\n\t\n}\n\nexport default " + inputbox.value)
				})
				let cursorPos = new vscode.Position(3,4)
				editor.selection = new vscode.Selection(cursorPos,cursorPos)
			})
		})

		inputbox.show()

	});

	context.subscriptions.push(commandCreateComponent);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}