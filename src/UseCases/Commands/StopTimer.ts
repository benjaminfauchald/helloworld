import * as vscode from "vscode"
import GitService, { GitFlowPrefix } from "../../services/GitService";
import axios from 'axios'
import Harvest from "../../Entities/Harvest"

function StopTimer (context: vscode.ExtensionContext, statusBar: vscode.StatusBarItem, harvestTimerInterval: any): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.stopTimer', async () => {



    const accountId: string = await context.globalState.get('accountId') || ''
    const accessToken: string = await context.globalState.get('accessToken') || ''
    const currentTaskId: string = await context.globalState.get('currentTaskId') || ''



      let createPullRequest: boolean
      createPullRequest=false
      
      let options = ["Just Commit","Create pull request"]
    
      await vscode.window
      .showInformationMessage('Stopping timer. \n What do you want to do?', ...options)
      .then(selection => { 
        console.log(`User selected to ${selection}`)
        if (selection = options[1]){
          console.log(`Creating PR...`)
          createPullRequest=true
        } else {
        }
      })
   
      const commitMsg = await vscode.window.showInputBox({ prompt: 'Please enter your commit message as clearly as possible' });
      GitService.commit(commitMsg)

      if (!createPullRequest) {
        console.log(`Creating PR now`)
      } else {
        console.log(`just logging`)
      }



    if (!accountId || !accessToken) {
      vscode.window.showWarningMessage('You are not authenticated with Harvest /n Run the "Harvest: Login Command" first.')
      return
    }

    const harvest = new Harvest({
      accountId: accountId,
      accessToken: accessToken
    })


    if (!currentTaskId) {
      vscode.window.showWarningMessage('There is no current task being logged.')
      return
    }

    let timeEntryResponse: any
    try {
      timeEntryResponse = await axios.patch(
        `https://api.harvestapp.com/v2/time_entries/${currentTaskId}/stop`,
        {},
        { headers: harvest.headers }
      )
    } catch (err) {
      console.log(err)
      vscode.window.showErrorMessage('Issue stoping timer with Harvest.')
      return
    }

    vscode.window.showInformationMessage('Harvest Timer Stopped')


    // Stopping menubar timer
    console.log(`harvestTimerInterval: ${harvestTimerInterval}`)
    clearInterval(harvestTimerInterval)
    statusBar.text ='Harvest Timer Stopped'
    await context.globalState.update('currentTaskId', '')


  })
}

export default StopTimer
