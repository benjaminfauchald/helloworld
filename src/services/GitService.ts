import * as vscode from "vscode";
import { execSync, exec } from "child_process";

import * as child_process from 'child_process'

export declare type GitFlowPrefix = "feature" | "hotfix" | "release" | "support" | "";

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

    private exec( command: string, showErrorMessage: boolean = true ) : string {
        try {
            this._outputChannel.appendLine( command );
            const output = child_process.execSync( command, {
                cwd: this._cwd
            });

            console.log(`output:${output.toString().trim()}`)

            if (output) {
                this._outputChannel.appendLine( output.toString() );
                return output.toString().trim();
            }
        } catch( error ) {
            
            if ( showErrorMessage && error && error.message ) {


                console.log(`showErrorMessage:${showErrorMessage.toString().trim()}`) // just if we should show or not
                console.log(`error.status:${error.status.toString().trim()}`) // Might be 127 in your example.
                console.log(`error.message:${error.message.toString().trim()}`) // just if we should show or not
                console.log(`error.stderr:${error.stderr.toString().trim()}`) // Holds the stderr output. Use `.toString()`.
                console.log(`error.stdout:${error.stdout.toString().trim()}`) // Holds the stdout output. Use `.toString()`.

                // Gotta refactor later so each finction takes care of their own errors
                // Send these errors or success in array back
                // But for now daddy's gotta hack it...


                let errorMessage = ""
                if (error.stderr){
                    errorMessage = `${error.stderr} - ${error.stdout}`
                } else {
                    errorMessage = `${error.stderr} - ${error.stdout}`
                }
                this._outputChannel.appendLine(`Error: ${errorMessage}`)

                let branch = this.activeBranch
                let issue = branch.split("_")[0]        // remove the description

                errorMessage = errorMessage.replace(branch,issue)
                
                let prefix = branch.split("/")[0] + "/"        // remove teh prefix

                console.log(`branch: ${branch} prefix: ${prefix} errorMessage: ${errorMessage}`)
                errorMessage = errorMessage.replace(prefix,'')

    
                console.log(`Got errorMessage = ${errorMessage}`)

                vscode.window.showErrorMessage(errorMessage)
            }

            return "";
        }

        return "";
    }

    private getConfig( key: string ): string {
        return this.exec(`git config ${key}`, false);
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
        const rawBranches = output.split(`\n`);

        return rawBranches.map((branch) => {
            branch = branch.replace(/[*]/gm, "");
            branch = branch.trim();

            return branch;
        });
    }

    public get activeBranch(): string {
        const output = this.exec("git branch");
        const branches = output.split("\n");
        const activeBranch = branches.find((branch) => branch.startsWith("*"));
        return activeBranch?.replace("*", "").trim() || "";
    }


    public commit(commitMsg: any) {
        console.clear()
        let cmd_msg = this.exec(`git add . && git commit -am "${commitMsg}"`, true)
        console.log(`cmd msg: ${cmd_msg}`)
        vscode.window.showInformationMessage(`Status: ${cmd_msg}`)
        return cmd_msg
    }


    public checkout(branch: string): string {
        return this.exec(`git checkout ${branch}`);
    }

    public flowStart(prefix: GitFlowPrefix, branch: string) {
        return this.exec(`git flow ${prefix} start ${branch}`);
    }

    public flowTrack(prefix: GitFlowPrefix, branch: string | vscode.TreeItemLabel) {
        return this.exec(`git flow ${prefix} track ${branch}`);
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