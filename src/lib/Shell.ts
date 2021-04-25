
async function Shell(cmd: string) {

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
       console.log(`stdout: ${stdout}`)
        JSON.stringify(stdout)
    });
    
}

export default Shell
