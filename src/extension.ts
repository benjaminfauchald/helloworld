// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import Config from './UseCases/Commands/Config'
import SetUserAuthentication from './UseCases/Commands/SetUserAuthentication'
import JiraTest from './UseCases/Commands/JiraTest'
import GetJiraIssues from './UseCases/Commands/GetJiraIssues'

import TreeDataProvider from './lib/TreeDataProvider'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	context.globalState.update('JIRA_OLD_API_URL','https://morphosis.atlassian.net/rest/agile/1.0/')
	Config("JIRA_USERNAME","git config user.email",context)
	Config("JIRA_PASSWORD","printenv JIRA_API_KEY",context)
	Config("HARVEST_ACCESS_TOKEN","printenv HARVEST_ACCESS_TOKEN",context)
	Config("HARVEST_ACCOUNT_ID","printenv HARVEST_ACCOUNT_ID",context)
	Config("HARVEST_ACCESS_TOKEN","printenv HARVEST_ACCESS_TOKEN",context)
	Config("FRESHTEAM_API_KEY","printenv FRESHTEAM_API_KEY",context)
	Config("SLACK_TICKET_HOOK_PRODUCTION","printenv SLACK_TICKET_HOOK_PRODUCTION",context)


	// Getting Jira Issues
	JiraTest

	// Adding Treeview
	vscode.window.registerTreeDataProvider('exampleView', new TreeDataProvider());

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
