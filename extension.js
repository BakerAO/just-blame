const vscode = require('vscode')

let statusBarItem = null

function activate(context) {
	const commandId = 'just.blame'

	context.subscriptions.push(vscode.commands.registerCommand(commandId, function () {
		let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`)
	}))

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	context.subscriptions.push(statusBarItem);

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	updateStatusBarItem();
}

function updateStatusBarItem() {
	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor)
	if (n > 0) {
		statusBarItem.text = `$(megaphone) ${n} line(s) selected`
		statusBarItem.show()
	} else {
		statusBarItem.hide()
	}
}

function getNumberOfSelectedLines(editor) {
	let lines = 0
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0)
	}
	return lines
}

exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
