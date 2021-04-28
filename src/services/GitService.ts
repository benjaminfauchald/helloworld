import * as vscode from "vscode";
import { execSync, exec } from "child_process";

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
            const output = execSync( command, {
                cwd: this._cwd
            });

            if (output) {
                this._outputChannel.appendLine( output.toString() );
                return output.toString().trim();
            }
        } catch( ex ) {
            if ( showErrorMessage && ex && ex.message ) {
                this._outputChannel.appendLine( `Error: ${ex.message}`);
                vscode.window.showErrorMessage( ex.message );
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