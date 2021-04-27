import * as vscode from "vscode"
import axios from 'axios'
import Harvest from "../../Entities/Harvest"

function StopTimer (context: vscode.ExtensionContext, statusBar: vscode.StatusBarItem, harvestTimerInterval: any): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.stopTimer', async () => {



    const accountId: string = await context.globalState.get('accountId') || ''
    const accessToken: string = await context.globalState.get('accessToken') || ''
    const currentTaskId: string = await context.globalState.get('currentTaskId') || ''

    console.clear
    console.log(`accountId:${accountId}`)
    console.log(`accessToken:${accessToken}`)
    console.log(`currentTaskId:${currentTaskId}`)


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

    console.log(`harvestTimerInterval: ${harvestTimerInterval}`)
    clearInterval(harvestTimerInterval)
    statusBar.text ='Harvest Timer Stopped'
    await context.globalState.update('currentTaskId', '')


  })
}

export default StopTimer
