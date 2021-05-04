import * as vscode from "vscode";
import axios from 'axios'
import Jira from '../../Entities/Jira'
import TreeDataProvider from '../../lib/TreeDataProvider'


function BitBucketTest (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.JiraTest', async () => {

    const BITBUCKET_USERNAME: string = context.globalState.get("BITBUCKET_USERNAME") || ''
    const BITBUCKET_PASSWORD: string = context.globalState.get("BITBUCKET_PASSWORD") || ''
    const BITBUCKET_URL: string = context.globalState.get("BITBUCKET_URL") || ''

    if (!BITBUCKET_USERNAME || !BITBUCKET_PASSWORD) {
      vscode.window.showWarningMessage('You are not authenticated with Bitbucket /n Run the "BitBucket: Login Command" first.')
      return
    }

    console.trace
    console.log(`BITBUCKET_URL ${BITBUCKET_URL}`)


    
    const url = BITBUCKET_URL


    console.log(`URL: ${url}`)
    console.log(`Jira.headers: ${Jira.headers}`)

    let issuesResponse: any
    try {
      issuesResponse = await axios.get(
        url,
        { headers: Jira.headers}
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


export default BitBucketTest