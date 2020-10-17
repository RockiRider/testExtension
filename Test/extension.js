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
	console.log('Congratulations, your extension "Test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('Test.startAnimation', function () {

		//let close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";
		//let markdown_preview_command_id = "markdown.showPreviewToSide";
		let input = "Input Here!";

		const htmlContent = `
		<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
	<foreignObject width="100%" height="100%">
		<div xmlns="http://www.w3.org/1999/xhtml">
		<style>
		section {
		  width: 50px;
		  height: 50px;
		  background-color: red;
		  position: relative;
		  animation: myfirst 5s linear 1s infinite alternate;
		}
		
		@keyframes myfirst {
		  0%   {background-color:red; left:0%; top:0px;}
		  100%  {background-color:yellow; left:90%; top:0px;}
		}
		</style>
		
	<section>` + input + `</section>
	</div>
 </foreignObject>
</svg>
		`;

		const display = `# Welcome, this is the first test. 
![](liveData/img.svg)`;


		const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;



		//Creates Folder and HTML File
		fs.mkdir(path.join(folderPath, "liveData"), {
			recursive: true
		}, (err) => {
			if (err) {
				console.error(err);
				return vscode.window.showErrorMessage("Failed to create animation file");
			}
			fs.writeFile(path.join(folderPath, "liveData/img.svg"), htmlContent, err => {
				if (err) {
					console.error(err);
					return vscode.window.showErrorMessage("Failed to create animation file");
				}
				vscode.window.showInformationMessage("Created Animation File");
			});
		});
		//Creates MD File
		const mdPath = path.join(folderPath, "Display.md");
		fs.writeFile(mdPath, display, err => {
			if (err) {
				console.error(err);
				return vscode.window.showErrorMessage("Failed to create README file");
			}
			//Bring up MD File
			vscode.workspace.openTextDocument(mdPath).then(document => vscode.window.showTextDocument(document), err => {
				console.log("Failed To Show MD Document");
			});

			//Bring up MD File Preview
			//vscode.commands.executeCommand(markdown_preview_command_id).then(() => {}, (e) => console.error(e));
			//console.log("Failed to Bring Up Preview");
		})

	let alreadyOpenedFirstMarkdown = false;
    let markdown_preview_command_id = "";
    let close_other_editor_command_id = "";
    close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";
    markdown_preview_command_id = "markdown.showPreviewToSide";
    function previewFirstMarkdown() {
        if (alreadyOpenedFirstMarkdown) {
	    return;
	}
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc && doc.languageId === "markdown") {
                openMarkdownPreviewSideBySide();
                alreadyOpenedFirstMarkdown = true;
            }
        }
    }
    function openMarkdownPreviewSideBySide() {
        vscode.commands.executeCommand(close_other_editor_command_id)
        .then(() => vscode.commands.executeCommand(markdown_preview_command_id))
        .then(() => {}, (e) => console.error(e));
    }

    if (vscode.window.activeTextEditor) {
        previewFirstMarkdown();
    } else {
        vscode.window.onDidChangeActiveTextEditor(()=>{
            previewFirstMarkdown();
        });
    }

    vscode.workspace.onDidOpenTextDocument((doc)=>{
        if (doc && doc.languageId === "markdown") {
            openMarkdownPreviewSideBySide();
        }
    });


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