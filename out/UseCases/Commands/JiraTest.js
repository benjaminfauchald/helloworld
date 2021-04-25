"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const axios_1 = require("axios");
const Jira_1 = require("../../Entities/Jira");
function JiraTest(context) {
    return vscode.commands.registerCommand('harvest-vscode.JiraTest', () => __awaiter(this, void 0, void 0, function* () {
        const JIRA_USERNAME = context.globalState.get("JIRA_USERNAME") || '';
        const JIRA_PASSWORD = context.globalState.get("JIRA_PASSWORD") || '';
        if (!JIRA_USERNAME || !JIRA_PASSWORD) {
            vscode.window.showWarningMessage('You are not authenticated with Jira /n Run the "Jira: Login Command" first.');
            return;
        }
        const jira = new Jira_1.default({
            JIRA_USERNAME: JIRA_USERNAME,
            JIRA_PASSWORD: JIRA_USERNAME
        });
        let timeEntryResponse;
        let key = "MOPS-10";
        //const url = `https://morphosis.atlassian.net/rest/api/3/issue/${key}/?fields=timetracking`
        const url = "https://morphosis.atlassian.net/rest/api/3/search?jql=assignee=currentuser()";
        console.log(`URL: ${url}`);
        console.log(`Jira.headers: ${jira.headers}`);
        let issuesResponse;
        try {
            issuesResponse = yield axios_1.default.get(url, { headers: jira.headers });
        }
        catch (err) {
            console.log(err);
            vscode.window.showErrorMessage('Issue stoping timer with Harvest.');
            return;
        }
        let i = 0;
        const data = issuesResponse.data;
        for (i = 0; i < data.issues.length; i++) {
            console.log(data.issues[i].key);
        }
        //console.log(issuesResponse.data)
        vscode.window.showInformationMessage(`We got something, ${data.total} issues`);
    }));
}
exports.default = JiraTest;
//# sourceMappingURL=JiraTest.js.map