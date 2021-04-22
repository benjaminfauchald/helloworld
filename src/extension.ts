// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import SetUserAuthentication from './UseCases/Commands/SetUserAuthentication'
import HelloWorld from './UseCases/Commands/HelloWorld'
import GitEmail from './UseCases/Commands/GitEmail'
import ShellTest from './UseCases/Commands/ShellTest'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');


	// This sets the command in the statusbar
	const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	statusbar.text = 'Morphois'
	statusbar.command = 'harvest-vscode.HelloWorld'
	statusbar.command = 'harvest-vscode.GitInfo'
	statusbar.command = 'harvest-vscode.ShellTest'
	statusbar.show()


	// The command has been defined in the package.json file

	const commands: vscode.Disposable[] = [
		SetUserAuthentication(context),
		HelloWorld(context),
		GitEmail(context),
		ShellTest(context)
	]

	context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {}
