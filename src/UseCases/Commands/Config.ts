import * as vscode from "vscode"

async function Config(config: string, cmd: string, context: vscode.ExtensionContext) {

    if (cmd == "") {cmd="git config user.email"}

    const { exec } = require("child_process")
    
    return await exec(cmd, (error: { message: string; }, stdout: string, stderr: string) => {
       if (error) {
           console.log(`error: ${error.message}`)
           return;
       }
       if (stderr) {
           console.log(`stderr: ${stderr}`)
           return;
       }
       context.globalState.update(config,stdout.trim())
    //    console.log(`stdout: ${stdout}`)
    //    console.log(`${config}: ${context.globalState.get(config)}`)
    });
    
}

export default Config
