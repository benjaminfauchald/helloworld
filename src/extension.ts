// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import axios from 'axios'

import Config from './UseCases/Commands/Config'
import SetUserAuthentication from './UseCases/Commands/SetUserAuthentication'
import SetupHarvest from './UseCases/SetupHarvest'

import JiraTest from './UseCases/Commands/JiraTest'
import GetJiraIssues from './UseCases/Commands/GetJiraIssues'

import Hello from './UseCases/Commands/Hello'
import TreeDataProvider from './lib/TreeDataProvider'
import NodeDependenciesProvider from './lib/NodeDependenciesProvider'

import Harvest from "./Entities/Harvest"
import ProjectInterface from "./Entities/Interfaces/ProjectInterface"
import UserInterface from './Entities/Interfaces/UserInterface';
import Project from "./Entities/Project"
import ProjectCollection from "./Entities/ProjectCollection"
import User from "./Entities/User"
import getProjectsAssignments from "./UseCases/getProjectsAssignments"
import getUser from "./UseCases/getUser"







// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

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

	// Logging into harvest
	SetUserAuthentication(context)
	SetupHarvest(context)






	// Getting Jira Issues
	JiraTest



		// Adding Jira Treeview
	vscode.window.registerTreeDataProvider('taskOutline', new TreeDataProvider());

	// Trying to set command on tree view


	vscode.commands.registerCommand("taskOutline.selectNode", async (item:vscode.TreeItem) => {
		console.clear() 
		console.log(item.label);
		console.log(item.label!.toString().split('/')[0]);


		// vscode.window
		// 	.showInformationMessage('hello', ...['test', 'taco', 'cheeseburger'])
		// 	.then(selection => {
		// 		console.log(selection);
		// 	});

		let me:any = await getUser() 
		if (!me.email) return

		console.log(`that was easy${me.email}`)
		console.log(`that was easy${me.firstName}`)



		let projectCollection = new ProjectCollection()
		const isHarvestSetup = await SetupHarvest(context)
		if (!isHarvestSetup) return
		
		const projectNames = projectCollection.elements.map((p: Project) => {
			return p.name
		})

		//console.log(`projectNames ${projectNames}`);


		// vscode.window.showQuickPick(projectNames, {
		// 	ignoreFocusOut: true,
		// 	placeHolder: 'Choose a Project'
		// })



	})


	// This sets the command in the statusbar
	const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	statusbar.text = 'Morphois'
//	statusbar.command = 'harvest-vscode.login'
	statusbar.show()

	// The command has been defined in the package.json file

	const commands: vscode.Disposable[] = [
		JiraTest(context)		
	]

	context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {}
