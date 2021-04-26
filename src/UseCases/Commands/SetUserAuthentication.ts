
///<reference path="./Harvest.ts">
///<reference path="./User.ts">

import * as vscode from "vscode";
import Harvest from "../../Entities/Harvest"
import User from "../../Entities/User"

import ProjectInterface from "../../Entities/Interfaces/ProjectInterface"
import UserInterface from "../../Entities/Interfaces/UserInterface"
import Project from "../../Entities/Project"
import ProjectCollection from "../../Entities/ProjectCollection"

import getProjectsAssignments from "../getProjectsAssignments"
import getUser from "../getUser"


function SetUserAuthentication (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.login', async () => {


    // for some reason it does not allow me to use accountId in this scope since I import it from Harvest(?)

    new Harvest().destructor()
    new User().destructor()

    let accountId2: string
    accountId2 = await context.globalState.get("HARVEST_ACCOUNT_ID") || ''

    if (accountId2 === "") {
      vscode.window.showErrorMessage('No Account Id Proveded')
      return
    }

    let accessToken2: string
    accessToken2 = await context.globalState.get("HARVEST_ACCESS_TOKEN") || ''

    if (accessToken2 === "") {
      vscode.window.showErrorMessage('No Access Token Proveded')
      return
    }

    // Since this is code from another repo I have not refactored anything yet, its just about geting it to work at this point
    await context.globalState.update('accountId', accountId2)
    await context.globalState.update('accessToken', accessToken2)


    new Harvest({
      accountId: accountId2,
      accessToken: accessToken2
    })

    console.log(`accountId: ${accountId2}`)
    console.log(`accessToken: ${accessToken2}`)





    const harvest = new Harvest()
    let projectCollection = new ProjectCollection()
    let user = new User()
    
    console.log("Trying to login")
    const accountId: string = context.globalState.get('accountId') || ''
    const accessToken: string = context.globalState.get('accessToken') || ''
    
    if (!accountId || !accessToken) {
      vscode.window.showErrorMessage('Run "Harvest: Login" Command before trying to puch time')
      return false
    }
  
    harvest.accountId = accountId
    harvest.accessToken = accessToken
  
    if (!user.id) {
      vscode.window.showInformationMessage('Authenticating with Harvest')
      let userProps: UserInterface
      try {
        userProps = await getUser()
      } catch (err) {
        console.log(err)
        vscode.window.showErrorMessage('Could not retrieve user data from Harvest')
        return false
      }
      if (!userProps.id) {
        vscode.window.showErrorMessage('Could not retrieve user data from Harvest')
        return false
      }
      user.destructor()
      user = new User(userProps)
    }
  
    if (projectCollection.elements.length <= 0) {
      vscode.window.showInformationMessage('Getting Projects from Harvest')
      try {
        let projectsData = await getProjectsAssignments()
        const projects = projectsData.map((p: ProjectInterface) => {
          return new Project(p)
        })
        projectCollection.addMany(projects)
      } catch (err) {
        console.log(err)
        vscode.window.showErrorMessage('Could not retrieve user projects')
        return false
      }
    }
  
    
    return true






  })
}

export default SetUserAuthentication