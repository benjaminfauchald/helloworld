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
const Shell_1 = require("./Shell");
function Initiallize(context) {
    return vscode.commands.registerCommand('harvest-vscode.Initiallize', () => __awaiter(this, void 0, void 0, function* () {
        yield context.globalState.update('JIRA_OLD_API_URL', 'https://morphosis.atlassian.net/rest/agile/1.0/');
        yield context.globalState.update('JIRA_USERNAME', Shell_1.default("git config user.email"));
        yield context.globalState.update('JIRA_PASSWORD', Shell_1.default("printenv JIRA_API_KEY"));
        yield context.globalState.update('HARVEST_ACCESS_TOKEN', Shell_1.default("printenv HARVEST_ACCESS_TOKEN"));
        yield context.globalState.update('HARVEST_ACCOUNT_ID', Shell_1.default("printenv HARVEST_ACCOUNT_ID"));
        yield context.globalState.update('HARVEST_ACCESS_TOKEN', Shell_1.default("printenv HARVEST_ACCESS_TOKEN"));
        yield context.globalState.update('FRESHTEAM_API_KEY', Shell_1.default("printenv FRESHTEAM_API_KEY"));
        yield context.globalState.update('SLACK_TICKET_HOOK_PRODUCTION', Shell_1.default("printenv SLACK_TICKET_HOOK_PRODUCTION"));
        const message = `Init done. \n SLACK_TICKET_HOOK_PRODUCTION: #${context.globalState.get('JIRA_USERNAME')}`;
        console.log(message);
        vscode.window.showWarningMessage(message);
    }));
}
exports.default = Initiallize;
//# sourceMappingURL=Initiallize.js.map