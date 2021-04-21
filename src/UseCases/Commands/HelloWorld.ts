import * as vscode from "vscode";


function HelloWorld (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.HelloWorld', async () => {

    vscode.window.showInformationMessage('Hello World from HelloWorld!');

  })
}


export default HelloWorld