import * as vscode from "vscode";
import axios from 'axios'


function JiraTest (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.JiraTest', async () => {

    const JIRA_USERNAME = context.globalState.get('JIRA_USERNAME','')
    const JIRA_PASSWORD = context.globalState.get('JIRA_PASSWORD','')

    var auth = Buffer.from(JIRA_USERNAME+':'+JIRA_PASSWORD,'base64');
    console.log(`Now thats a username: ${JIRA_USERNAME}`)

  })
}


export default JiraTest