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
		inputbox.prompt = 'Component Name'

		let componentsPath = vscode.workspace.getConfiguration('ReactGoQuick').get('ComponentPath') + '/'

		inputbox.onDidAccept(() => {
			inputbox.hide()

			let wsEdit = new vscode.WorkspaceEdit()
			// console.log(vscode.workspace.workspaceFolders[0])
			let file = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + componentsPath + inputbox.value + '.js')
			// console.log(file.path)
			wsEdit.createFile(file)

			vscode.workspace.applyEdit(wsEdit)
				.then(() => vscode.workspace.openTextDocument(file))
				.then((doc) => vscode.window.showTextDocument(doc))
				.then((editor) => {
					editor.edit((editBuilder) => {
						editBuilder.insert(new vscode.Position(0, 0), "import React from 'react'\n\nfunction " + inputbox.value + "(props) {\n\t\n\treturn()\n}\n\nexport default " + inputbox.value)
					}).then(() => {
						let cursorPos = new vscode.Position(3, 4)
						editor.selection = new vscode.Selection(cursorPos, cursorPos)
					})
				})
		})

		inputbox.show()

	});


	let commandCreateContext = vscode.commands.registerCommand('react-ext.CreateContext', () => {
		let inputbox = vscode.window.createInputBox()
		inputbox.prompt = 'Context Name'

		inputbox.onDidAccept(() => {
			inputbox.hide()
			let contextName = inputbox.value
			let fileName = inputbox.value + '.js'
			let functionName = inputbox.value + 'Provider'
			let componentsPath = vscode.workspace.getConfiguration('ReactGoQuick').get('ContextPath') + '/'


			let content =
				`import React, { createContext } from 'react'

export const ${contextName} = createContext()

function ${functionName}(props) {

	return (
		<${contextName}.Provider value={{}}>
			{props.children}
		</${contextName}.Provider>
	)
}

export default ${functionName}
`
			console.log(content)

			let file = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.path + '/src/contexts/' + fileName)
			let wsEdit = new vscode.WorkspaceEdit()

			wsEdit.createFile(file)
			vscode.workspace.applyEdit(wsEdit)
				.then(() => vscode.workspace.openTextDocument(file))
				.then((doc) => vscode.window.showTextDocument(doc))
				.then((editor) => {
					editor.edit((editorBuilder) => {
						editorBuilder.insert(new vscode.Position(0, 0), content)
					}).then(() => {
						let cursorPos = new vscode.Position(5, 4)
						editor.selection = new vscode.Selection(cursorPos, cursorPos)
					})
				})
		})

		inputbox.show()

	})

	let testTheFucks = vscode.commands.registerCommand('react-ext.testTheFucks', () => {
		console.log(vscode.workspace.getConfiguration('kellysReactExt').get('ComponentPath'))
	})

	context.subscriptions.push(commandCreateComponent);
	context.subscriptions.push(commandCreateContext);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}