import * as vscode from "vscode";


function Hello (context: vscode.ExtensionContext,message: string) {
    vscode.window.showInformationMessage(`We got something, someone wants to say: ${message}`)
    console.log(`We got something, someone wants to say: ${message}`)
    let tester: any
    return tester
}

export default Hello