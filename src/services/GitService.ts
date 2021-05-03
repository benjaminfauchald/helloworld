import * as vscode from "vscode";
import { execSync, exec } from "child_process";

import * as child_process from 'child_process'

export declare type GitFlowPrefix = "feature" | "hotfix" | "release" | "support" | "";



interface iGitExec {
        status: string;
        message?: string;
        stderr?: string;
        stdout?: string;
}


interface IGitFlowConfig {
    branches: {
        master?: string;
        develop?: string;
    },
    prefixes: {
        feature?: string;
        release?: string;
        hotfix?: string;
        support?: string;
        versiontag?: string;
    }
}

class GitService {

    private _cwd: string;
    private _outputChannel: vscode.OutputChannel;

    constructor(cwd: string, outputChannel: vscode.OutputChannel) {
        this._cwd = cwd;
        this._outputChannel = outputChannel;
    }

    private exec( command: string, showErrorMessage: boolean = true ) :iGitExec {
        var gitExec: iGitExec = {status:""};
        try {
            this._outputChannel.appendLine( command );
            const output = child_process.execSync( command, {
                cwd: this._cwd
            });

            console.log(`output:${output.toString().trim()}`)

            if (output) {
                this._outputChannel.appendLine( output.toString() );
                var gitExec: iGitExec = {status:""};
                gitExec.status = output.toString().trim()
                return(gitExec) 
                
            }
        } catch( error ) {
            
            if ( showErrorMessage && error && error.message ) {

                var gitExec: iGitExec = {status:""};
                gitExec.status = error.status.toString().trim()    
                gitExec.message = error.message.toString().trim()    
                gitExec.stderr = error.stderr.toString().trim()    
                gitExec.stdout = error.stdout.toString().trim()    

                let errorMessage = `${error.stderr} - ${error.stdout}`
                this._outputChannel.appendLine(`Error: ${errorMessage}`)

            }
            return(gitExec) 
        }
        return(gitExec) 
    }


    private getConfig( key: string ): string {
        return this.exec(`git config ${key}`, false).status;
    }

    public get flowConfig(): IGitFlowConfig {

        return {
            "branches": {
                "master": this.getConfig("gitflow.branch.master") ?? undefined,
                "develop": this.getConfig("gitflow.branch.develop") ?? undefined
            },
            "prefixes": {
                "feature": this.getConfig("gitflow.prefix.feature") ?? undefined,
                "release": this.getConfig("gitflow.prefix.release") ?? undefined,
                "hotfix": this.getConfig("gitflow.prefix.hotfix") ?? undefined,
                "support": this.getConfig("gitflow.prefix.support") ?? undefined,
                "versiontag": this.getConfig("gitflow.prefix.versiontag") ?? undefined
            }
        };
    }


    public get branches(): string[] {
        const output = this.exec("git branch --all");
        const rawBranches = output.status.split(`\n`);

        return rawBranches.map((branch) => {
            branch = branch.replace(/[*]/gm, "");
            branch = branch.trim();

            return branch;
        });
    }

    public get activeBranch(): string {
        const output = this.exec("git branch");
        const branches = output.status.split("\n");
        const activeBranch = branches.find((branch) => branch.startsWith("*"));
        return activeBranch?.replace("*", "").trim() || "";
    }


    public commit(commitMsg: any) {
        console.clear()

        //So now we made a type interface instead that returns the errors if any
        var gitExec: iGitExec = {status:""};
        gitExec =  this.exec(`git add . && git commit -am "${commitMsg}"`, true)

        // Now we can do error handling in each function with seperation of concerns
        console.log(`gitExec.status ${gitExec.status}`)
        console.log(`gitExec.message ${gitExec.message}`)
        console.log(`gitExec.stderr ${gitExec.stderr}`)
        console.log(`gitExec.stdout ${gitExec.stdout}`)


        let branch = this.activeBranch                  //The whole branchname will clutter the error message, so lets just get the issue number
        let issue = branch.split("_")[0]                // remove the description
        let prefix = branch.split("/")[0] + "/"         // remove the prefix

        console.log(`branch: ${prefix}`)
        console.log(`issue: ${prefix}`)
        console.log(`prefix: ${prefix}`)

        if (gitExec.status != "1") {                    // This check sucks, this has to be refactored, i dont know why he did it this way

            // Clean up the branch name so we can see it in the error message box
            gitExec.status = gitExec.status.split('\n')[1]
            issue = issue.replace(prefix,'')
            gitExec.status = `Done. ${issue}: ${gitExec.status}`
            vscode.window.showInformationMessage(`${gitExec.status}`)
            console.log(`Status: ${gitExec.status}`)


        } else {

            // Clean up the branch name so we can see it in the error message box
            let errorMessage = `${gitExec.stderr} - ${gitExec.stdout}`
            errorMessage = errorMessage.replace(branch,issue)
            errorMessage = errorMessage.replace(prefix,'')
            vscode.window.showErrorMessage(errorMessage)
    
        }
    }


    public checkout(branch: string): string {
        return this.exec(`git checkout ${branch}`).status;
    }

    public flowStart(prefix: GitFlowPrefix, branch: string) {
        return this.exec(`git flow ${prefix} start ${branch}`);
    }

    public flowTrack(prefix: GitFlowPrefix, branch: string | vscode.TreeItemLabel) {
        return this.exec(`git flow ${prefix} track ${branch}`).status;
    }

    public flowFinish( prefix: GitFlowPrefix, branch: string | vscode.TreeItemLabel ) {
        if( prefix === "release" ) {
            vscode.window.showInputBox({
                placeHolder: "Enter tag message"
            }).then( ( tagMessage ) => {
                execSync("", {
                    input: tagMessage,
                });
            });
        }

        return this.exec(`git flow ${prefix} finish ${branch}`);
    }

    public delete(branch: string, isRemote: boolean = false) {
        if (isRemote) {
            const remoteBranch = branch.replace("remotes/origin/", "");
            return this.exec(`git push origin --delete ${remoteBranch}`);
        }
        else {
            return this.exec(`git branch -d ${branch}`);
        }
    }

    public pull( branch: string ){
        const currentBranch = this.activeBranch;
        console.log( currentBranch );

        this.exec(`git checkout ${branch}`);
        this.exec(`git pull`);
        this.exec(`git checkout ${currentBranch}`);
    }

    public mergeBranch(branchToMerge: string | vscode.TreeItemLabel, prefix: GitFlowPrefix, branchName: string | vscode.TreeItemLabel, isRemote?: boolean) {
        this.exec(`git pull origin ${branchToMerge}`);

        if (isRemote) {
            this.flowTrack(prefix, branchName);
        } else {
            this.checkout(`${prefix}/${branchName}`);
        }

        this.exec(`git merge ${branchToMerge}`);
    }

    public get isInitialized(): boolean {
        const { master, develop } = this.flowConfig.branches;
        return (
            master !== undefined &&
            develop !== undefined
        );
    }
}

const service = new GitService(vscode.workspace.rootPath || "", vscode.window.createOutputChannel("Git Flow") );
export default service;