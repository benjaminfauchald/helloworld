"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const Config_1 = require("./UseCases/Commands/Config");
const SetUserAuthentication_1 = require("./UseCases/Commands/SetUserAuthentication");
const JiraTest_1 = require("./UseCases/Commands/JiraTest");
const TreeDataProvider_1 = require("./lib/TreeDataProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    context.globalState.update('JIRA_OLD_API_URL', 'https://morphosis.atlassian.net/rest/agile/1.0/');
    Config_1.default("JIRA_USERNAME", "git config user.email", context);
    Config_1.default("JIRA_PASSWORD", "printenv JIRA_API_KEY", context);
    Config_1.default("HARVEST_ACCESS_TOKEN", "printenv HARVEST_ACCESS_TOKEN", context);
    Config_1.default("HARVEST_ACCOUNT_ID", "printenv HARVEST_ACCOUNT_ID", context);
    Config_1.default("HARVEST_ACCESS_TOKEN", "printenv HARVEST_ACCESS_TOKEN", context);
    Config_1.default("FRESHTEAM_API_KEY", "printenv FRESHTEAM_API_KEY", context);
    Config_1.default("SLACK_TICKET_HOOK_PRODUCTION", "printenv SLACK_TICKET_HOOK_PRODUCTION", context);
    // Getting Jira Issues
    JiraTest_1.default;
    // Adding Treeview
    vscode.window.registerTreeDataProvider('exampleView', new TreeDataProvider_1.default());
    // This sets the command in the statusbar
    const statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusbar.text = 'Morphois';
    statusbar.command = 'harvest-vscode.JiraTest';
    statusbar.show();
    // The command has been defined in the package.json file
    const commands = [
        SetUserAuthentication_1.default(context),
        JiraTest_1.default(context)
    ];
    context.subscriptions.push(...commands);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map