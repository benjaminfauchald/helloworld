import * as vscode from "vscode";


function SetUserAuthentication (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.login', async () => {
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from HelloWorld!');
  })
}

export default SetUserAuthentication