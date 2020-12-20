// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "reader" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('reader.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		//let files = getFiles();

		//console.log(files);

		let p = new Promise((resolve,reject)=>{
			const files = vscode.workspace.findFiles('**/*.*', '**/node_modules/**');
			if (files) {
				resolve(files);
				console.log("Here");
	
			} else {
				reject("No Files");
				console.log("ERR!");
			}
		})

		p.then((files)=>{
			files.forEach(file => {
				console.log(file);
	
			});
		}).catch((message)=>{
			vscode.window.showInformationMessage(message +' in WorkSpace!');
		})
		//vscode.window.showInformationMessage('No Files in WorkSpace!');

		

		// Display a message box to the user


		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from readerTest!');

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}


function markFiles() {
	return new Promise(function (resolve, reject) {
		const files = vscode.workspace.findFiles('**/*.*', '**/node_modules/**');
		if (files) {
			resolve("Stuff worked!");
			console.log("Here");

		} else {
			reject(Error("It broke"));
			console.log("ERR!");
		}
	});
}
async function getFiles(){
	const response = await markFiles();
	console.log("Response Recieved");
	return response;
}

module.exports = {
	activate,
	deactivate
}