// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import SetUserAuthentication from './UseCases/Commands/SetUserAuthentication'
import Test from './UseCases/Commands/Test'
import JiraTest from './UseCases/Commands/JiraTest'




// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	context.globalState.update('JIRA_OLD_API_URL','https://morphosis.atlassian.net/rest/agile/1.0/')
    context.globalState.update('JIRA_USERNAME','benjamin@morphos.is')
    context.globalState.update('JIRA_PASSWORD','gmFHjBIJDSMZhnQ2JGF903A0')


	// This sets the command in the statusbar
	const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	statusbar.text = 'Morphois'
	statusbar.command = 'harvest-vscode.JiraTest'
	statusbar.show()


	// The command has been defined in the package.json file

	const commands: vscode.Disposable[] = [
		SetUserAuthentication(context),
		JiraTest(context)
	]

	context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {}
