import * as vscode from "vscode";


function Hello (context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage(`We got something, hello to ${context}`)
    let tester: any
    return tester
}

export default Hello