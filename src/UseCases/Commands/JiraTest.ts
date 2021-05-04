import * as vscode from "vscode";
import axios from 'axios'
import Jira from '../../Entities/Jira'
import TreeDataProvider from '../../lib/TreeDataProvider'


function JiraTest (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.JiraTest', async () => {

    const JIRA_USERNAME: string = context.globalState.get("JIRA_USERNAME") || ''
    const JIRA_PASSWORD: string = context.globalState.get("JIRA_PASSWORD") || ''

    if (!JIRA_USERNAME || !JIRA_PASSWORD) {
      vscode.window.showWarningMessage('You are not authenticated with Jira /n Run the "Jira: Login Command" first.')
      return
    }


    const jira = new Jira({
      JIRA_USERNAME: JIRA_USERNAME,
      JIRA_PASSWORD: JIRA_PASSWORD,
      JIRA_API_URL: await context.globalState.get("JIRA_API_URL") || '',
      JIRA_ACTION: '',
      JIRA_QUERY: ''
    })

 
    let timeEntryResponse: any
    let key = "MOPS-10"
    
    //const url = `https://morphosis.atlassian.net/rest/api/3/issue/${key}/?fields=timetracking`
    const url = "https://morphosis.atlassian.net/rest/api/3/search?jql=assignee=currentuser()"


    console.log(`URL: ${url}`)
    console.log(`Jira.headers: ${jira.headers}`)

    let issuesResponse: any
    try {
      issuesResponse = await axios.get(
        url,
        { headers: jira.headers}
      )
    } catch (err) {
      console.log(err)
        vscode.window.showErrorMessage('Issue getting Jira issues :P ')
      return
    }

    let i=0
    const data = issuesResponse.data
    for (i = 0; i < data.issues.length; i++) {
      console.log(data.issues[i].key);
    }



    //console.log(issuesResponse.data)
    vscode.window.showInformationMessage(`We got something, ${data.total} issues`)



  })
}


export default JiraTest