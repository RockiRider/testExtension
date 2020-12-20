// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
var fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testView" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('testView.runVis', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Start View from testView!');
		const panel = vscode.window.createWebviewPanel(
			'liveVis', // Identifies the type of the webview. Used internally
			'Live Visualisation', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true
			} // Webview options. More on these later.
		);
		panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

function getWebviewContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>Live View</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.bundle.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.bundle.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
</head>
<body>
   <h1>Hello This Works</h1>
   <canvas id="myChart"></canvas>
   <script>
   var ctx = document.getElementById('myChart').getContext('2d');
   var chart = new Chart(ctx, {
	   // The type of chart we want to create
	   type: 'line',
   
	   // The data for our dataset
	   data: {
		   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		   datasets: [{
			   label: 'My First dataset',
			   backgroundColor: 'rgb(255, 99, 132)',
			   borderColor: 'rgb(255, 99, 132)',
			   data: [0, 10, 5, 2, 20, 30, 45]
		   }]
	   },
   
	   // Configuration options go here
	   options: {}
   });
   </script>
</body>
</html>`;
}

module.exports = {
	activate,
	deactivate
}