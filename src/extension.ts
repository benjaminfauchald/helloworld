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
import TaskInterface from './Entities/Interfaces/TaskInterface';
import TimeEntryInterface from './Entities/Interfaces/TimeEntryInterface';
import ExternalReferenceInterface from './Entities/Interfaces/ExternalReferenceInterface';

import Project from "./Entities/Project"

import ProjectCollection from "./Entities/ProjectCollection"
import User from "./Entities/User"
import getProjectsAssignments from "./UseCases/getProjectsAssignments"
import getUser from "./UseCases/getUser"
import saveNewTimeEntry from "./UseCases/saveNewTimeEntry" 

import { MessageOptions } from 'child_process'






// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	context.globalState.update('JIRA_OLD_API_URL','https://morphosis.atlassian.net/rest/agile/1.0/')
	Config("JIRA_DOMAIN","printenv JIRA_DOMAIN",context)
	Config("JIRA_USERNAME","git config user.email",context)
	Config("JIRA_PASSWORD","printenv JIRA_API_KEY",context)

	Config("HARVEST_DOMAIN","printenv HARVEST_DOMAIN",context)
	Config("HARVEST_ACCESS_TOKEN","printenv HARVEST_ACCESS_TOKEN",context)
	Config("HARVEST_ACCOUNT_ID","printenv HARVEST_ACCOUNT_ID",context)
	Config("HARVEST_ACCESS_TOKEN","printenv HARVEST_ACCESS_TOKEN",context)
	Config("FRESHTEAM_API_KEY","printenv FRESHTEAM_API_KEY",context)
	Config("SLACK_TICKET_HOOK_PRODUCTION","printenv SLACK_TICKET_HOOK_PRODUCTION",context)





	// Logging into harvest
	await SetUserAuthentication(context)
	await SetupHarvest(context)

	// Getting Jira Issues
	JiraTest

	// Adding Jira Treeview
	vscode.window.registerTreeDataProvider('taskOutline', new TreeDataProvider());

	// Trying to set command on tree view
	vscode.commands.registerCommand("taskOutline.selectNode", async (item:vscode.TreeItem) => {

		if(!item) return

		const timeEntryNote: string = item.label!.toString()
		const issueCode: string = item.label!.toString().split(' - ')[0] || ''
		const projectCode: string = item.label!.toString().split(' - ')[0].split('-')[0] || ''

		// Getting all projects and matching if we have a match with jira projec code and harvest code
		let projectCollection = new ProjectCollection()
		
		let match:boolean
		match=false

		let projectCollectionMatched:Project []
		projectCollectionMatched=[]
		projectCollection.elements.map((p: Project) => {
			console.clear
			if (projectCode === p.code){
				match=true
				projectCollectionMatched.push(p)
				console.log(`Jira ProjectCode ${projectCode} matches Harvest ProjectCode: ${p.code}`)
			}

		})

		console.log(`projectCollectionMatched.length ${projectCollectionMatched.length}`)
		//No match? Then tell user we cannot log until we add the jira code to the harvest project
		if (projectCollectionMatched.length === 0) {
			console.log()

			const harvestUrl = await context.globalState.get('HARVEST_DOMAIN')
			await vscode.window
				.showInformationMessage(`Jira ProjectCode "${projectCode}" does not have a matching Harvest ProjectCode.`, ...["Set Code","Cancel"])
				.then(selection => { 
					if (selection === "Cancel"){
						console.log(`No match for ${selectedProject}`)
					}else{
						vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://${harvestUrl}/projects?filter=active`))
					}
				})




			//*** SHOULD OPEN HARVEST TO ADD JIRA CODE ***/
			return
		}


		//We found a matching Jira and Harvest project, but there could be several harvest projects...
		
		let projectMatchedNames:any []
		projectMatchedNames = []
		projectCollectionMatched.map((p: Project) => {
			projectMatchedNames.push(p.name)
			console.log(`Harvest ProjectCodes found: ${p.name} - ${p.code}`)
			p.tasks.map((t: TaskInterface) => {
				console.log(`\t\tname:${t.name}`)
			})
		})

		var selectedProject: string
		selectedProject = "--"

		if (projectMatchedNames.length > 1){
			await vscode.window
				.showInformationMessage('Please select project to log to', ...projectMatchedNames)
				.then(selection => { 
				selectedProject = selection
				console.log(`må velge ${selectedProject}`)
				})
		}
		else {
			console.log("må ikke velge")
			selectedProject = projectMatchedNames[0]	
		}
		console.log(`Har valgt${selectedProject}`)

		let taskMatchedNames:any []
		let taskName:any
		taskMatchedNames = []

		console.clear
		console.log(`selectedProject ${selectedProject}`)

		projectCollectionMatched.map( async (p: Project) => {
			if (p.name===selectedProject){
				console.log(`Harvest ProjectCodes found: ${p.name} - ${p.code}`)
				p.tasks.map((t: TaskInterface) => {
			  		console.log(`\t\tname:${t.name}`)

					// Only show developer tasks as only the devs use vsCode. 
					// All dev tasks are marked with "Development - ! in the start of the task name in harvest

					// this is downright dirty, we should make a web view with dropdown, but I dont have time right now. For commercial, yes ;) 
					if (!t.name.indexOf("Development"))
					{
						taskName = t.name
						taskName = taskName.replace("Development", "")
						taskName = taskName.replace(" - ", "")				// just in case someone forgets this formatting
						taskMatchedNames.push(taskName)
					}
				})	

				// Can't be bothered to make a check if there is only one task here since usually they have to choose
				// Maybe in the future user can config to default task...

				await vscode.window
				.showInformationMessage('Please select task to log to:', ...taskMatchedNames)
				.then(selection => {
					console.log(selection);

					// Lol i gotta mark the map anon functions as async to have this thing properly await....
					p.tasks.map( async (t: TaskInterface) => {
						console.log(t.name.indexOf(selection))
						if (t.name.indexOf(selection) != -1)
						{


							// Now finally we log our entry!
							
							let jiraUrl: any 
							jiraUrl = context.globalState.get('JIRA_OLD_API_URL')
							jiraUrl = jiraUrl.split('/')[2] 

							let newExternalReference: ExternalReferenceInterface = {
								id: t!.id,
								group_id: t!.id,
								permalink:  `https://${jiraUrl}/secure/RapidBoard.jspa?rapidView=144&projectKey=${projectCode}&modal=detail&selectedIssue=${issueCode}`,
							}


							let newTimeEntry: TimeEntryInterface = {
								projectId: p!.id,
								taskId: t!.id,
								date: new Date().toISOString(),
								notes: timeEntryNote,
								external_reference: newExternalReference
							}

							let timeEntryMessage = `\nLogging "${t.name.replace("Development - ", "")}" ${t.id} for "${issueCode}" in "${p.name}"`
							await saveNewTimeEntry(newTimeEntry)
							await context.globalState.update('currentTaskId', p!.id)
							vscode.window.showInformationMessage(timeEntryMessage)

						}
				
					})
				})
			}
		})
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