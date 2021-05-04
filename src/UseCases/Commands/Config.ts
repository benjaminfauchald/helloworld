import * as vscode from "vscode"

async function Config(config: string, cmd: string, context: vscode.ExtensionContext) {

    if (cmd == "") {cmd="git config user.email"}

    const { exec } = require("child_process")
    
    return await exec(cmd, (error: { message: string; }, stdout: string, stderr: string) => {
       if (error) {
           console.log(`error: ${error.message}`)
           console.log(`stderr: ${stderr}`)
           console.log(`stderr: ${stdout}`)
           return;
       }
       if (stderr) {
           console.log(`stderr: ${stderr}`)
           console.log(`stderr: ${stdout}`)
           return;
       }
       context.globalState.update(config,stdout.trim())
    //    console.log(`stdout: ${stdout}`)
    //    console.log(`${config}: ${context.globalState.get(config)}`)
    });
    
}

export default Config
