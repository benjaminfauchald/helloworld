import * as vscode from "vscode";


function Test (context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('harvest-vscode.Test', async () => {

    let my_data = "";


    const { exec } = require("child_process");

    exec("ls -la", (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        my_data = stdout
        vscode.window.showInformationMessage(`stdout: ${my_data}`)
    });



  })
}


export default Test