import * as vscode from "vscode";



function GitBranch (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.GitBranch', async () => {

    // This looks a bitmore dirty, maybe this needs to be cleaned up 
    // with another package or write myself


  })
}


export default GitBranch