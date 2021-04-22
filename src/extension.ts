// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import SetUserAuthentication from './UseCases/Commands/SetUserAuthentication'
import Test from './UseCases/Commands/Test'
import JiraTest from './UseCases/Commands/JiraTest'


function shell(cmd: string){

    var $my_data = ""

    const { exec } = require("child_process");

    exec(cmd, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
       	$my_data = stdout
        //vscode.window.showInformationMessage(`stdout: ${my_data}`)
    });
    return $my_data
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');



	context.globalState.update('JIRA_OLD_API_URL','https://morphosis.atlassian.net/rest/agile/1.0/')
	context.globalState.update('JIRA_USERNAME',shell("git config user.email"))
	context.globalState.update('JIRA_PASSWORD',	shell("printenv JIRA_API_KEY"))
	context.globalState.update('HARVEST_ACCESS_TOKEN',shell("printenv HARVEST_ACCESS_TOKEN"))
	context.globalState.update('HARVEST_ACCOUNT_ID',shell("printenv HARVEST_ACCOUNT_ID"))
	context.globalState.update('HARVEST_ACCESS_TOKEN',shell("printenv HARVEST_ACCESS_TOKEN"))
	context.globalState.update('FRESHTEAM_API_KEY',shell("printenv FRESHTEAM_API_KEY"))
	context.globalState.update('SLACK_TICKET_HOOK_PRODUCTION',shell("printenv SLACK_TICKET_HOOK_PRODUCTION"))




	console.log("AND ALSO!")
	console.log(context.globalState.get('JIRA_USERNAME'))
	console.log(context.globalState)

	// This sets the command in the statusbar
	const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	statusbar.text = 'Morphois'
	statusbar.command = 'harvest-vscode.Test'
	statusbar.show()


	// The command has been defined in the package.json file

	const commands: vscode.Disposable[] = [
		SetUserAuthentication(context),
		JiraTest(context),
		Test("user.name")
	]

	context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {}
