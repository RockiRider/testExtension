// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fileReader" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('fileReader.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		let currentPath = vscode.window.activeTextEditor.document.uri.fsPath;

		if(currentPath){
			vscode.window.showInformationMessage('fileReader found an active file!');

			console.log(currentPath);

			let data = fs.readFileSync(currentPath,'utf8');

			console.log(data);

			
		}else{
			vscode.window.showInformationMessage('fileReader couldnt find an active file!');
		}


		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from fileReader!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
