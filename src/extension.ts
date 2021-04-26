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
	Config("JIRA_USERNAME","git config user.email",context)
	Config("JIRA_PASSWORD","printenv JIRA_API_KEY",context)
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

		const issueCode: string = item.label!.toString().split(' - ')[0]
		const ProjectCode: string = item.label!.toString().split(' - ')[0].split('-')[0] || ''
//		const timeEntryNote: string = item.label!.toString()

		console.clear() 
		console.log(item.label);
		console.log(ProjectCode);

	

		// vscode.window
		// 	.showInformationMessage('hello', ...['test', 'taco', 'cheeseburger'])
		// 	.then(selection => {
		// 		console.log(selection);
		// 	});

		// let me:any = await getUser() 
		// if (!me.email) return

		// console.log(`Found ${me.email}`)
		// console.log(`For Khun ${me.firstName}`)


		const isHarvestSetup = await SetupHarvest(context)
		if (!isHarvestSetup) return

		// Getting all projects and matching if we have a match with jira projec code and harvest code
		let projectCollection = new ProjectCollection()
		
		let match:boolean
		match=false

		let projectCollectionMatched:Project []
		projectCollectionMatched=[]
		projectCollection.elements.map((p: Project) => {

			if (ProjectCode === p.code){
				match=true
				projectCollectionMatched.push(p)
				console.log(`Jira ProjectCode ${ProjectCode} matches Harvest ProjectCode: ${p.code}`)
			}

		})

		//No match? Then tell user we cannot log until we add the jira code to the harvest project
		if (!match) {
			console.log(`Jira ProjectCode ${ProjectCode} does not have a matching Harvest ProjectCode.`)
			return
		}


			//We found a matching Jira and Harvest project, but there could be several harvest projects...
			console.clear
			console.log(`projectCollectionMatched:\n `)
			
			let ProjectMatchedNames:any []
			ProjectMatchedNames = []
			projectCollectionMatched.map((p: Project) => {
				ProjectMatchedNames.push(p.name)
				console.log(`Harvest ProjectCodes found: ${p.name} - ${p.code}`)
					p.tasks.map((t: TaskInterface) => {
						console.log(`\t\tname:${t.name}`)
					})
			})


			
			vscode.window
				.showInformationMessage('Please select project to log to', ...ProjectMatchedNames)
				.then(selection => {
					console.log(selection);

					let TaskMatchedNames:any []
					TaskMatchedNames = []

					projectCollectionMatched.map((p: Project) => {
						if (p.name===selection){
							console.log(`Harvest ProjectCodes found: ${p.name} - ${p.code}`)
							p.tasks.map((t: TaskInterface) => {
								console.log(`\t\tname:${t.name}`)

								// Only show developer tasks as only devs use vsCode. 
								// All dev tasks are marked with development in the start of the task name

								// this is downright dirty, we should make a web view with dropdown, but i dont have time. 
								
								if (!t.name.indexOf("Development"))
								{
									let taskName = t.name
									taskName = taskName.replace("Development", "")
									taskName = taskName.replace(" - ", "")				// just in case someone forgets this formatting
									TaskMatchedNames.push(taskName)
								}
							})	


							vscode.window
							.showInformationMessage('Please select task to log to:', ...TaskMatchedNames)
							.then(selection => {
								console.log(selection);

								// Lol i gotta mark the map anon function as async to have this thing properly await....
								p.tasks.map( async (t: TaskInterface) => {
									console.log(t.name.indexOf(selection))
									if (t.name.indexOf(selection) != -1)
									{
										console.log(`Logging to ${t.name} id: ${t.id}`)

										// finally we log our entry!

										// Hack link to jira?
										const timeEntryNote = `https://morphosis.atlassian.net/secure/RapidBoard.jspa?rapidView=126&projectKey=${ProjectCode}&modal=detail&selectedIssue=${issueCode}`

										const newTimeEntry: TimeEntryInterface = {
											projectId: p!.id,
											taskId: t!.id,
											date: new Date().toISOString(),
											notes: timeEntryNote

										}

										let timeEntryMessage = `\nLogging "${t!.name}" for "${issueCode}"`
										await saveNewTimeEntry(newTimeEntry)

										console.log (timeEntryMessage)
										vscode.window.showInformationMessage(timeEntryMessage)

										await context.globalState.update('currentTaskId', p!.id)

										







									}
								})






							}

						)}
					
					});
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
