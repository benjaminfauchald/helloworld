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
function Experimental(context) {
    return vscode.commands.registerCommand('harvest-vscode.Experimental', () => __awaiter(this, void 0, void 0, function* () {
        const JIRA_API_URL = 'https://morphosis.atlassian.net/rest/api/3/';
        const JIRA_OLD_API_URL = 'https://morphosis.atlassian.net/rest/agile/1.0/';
        const JIRA_USERNAME = 'benjamin@morphos.is';
        const JIRA_PASSWORD = 'gmFHjBIJDSMZhnQ2JGF903A0';
        var auth = Buffer.from(JIRA_USERNAME + ':' + JIRA_PASSWORD, 'base64');
        console.log(auth);
        //Build request
        var options = {
            method: "get",
            contentType: "application/json",
            headers: {
                "Authorization": "Basic " + auth,
            }
            //  ,muteHttpExceptions: true
        };
        vscode.window.showInformationMessage(`Still experimntal ${auth}`);
    }));
}
exports.default = Experimental;
//# sourceMappingURL=Experimental.js.map