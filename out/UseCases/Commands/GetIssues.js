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
const Harvest_1 = require("../../Entities/Harvest");
function StopTimer(context) {
    return vscode.commands.registerCommand('harvest-vscode.stopTimer', () => __awaiter(this, void 0, void 0, function* () {
        const accountId = context.globalState.get('accountId') || '';
        const accessToken = context.globalState.get('accessToken') || '';
        if (!accountId || !accessToken) {
            vscode.window.showWarningMessage('You are not authenticated with Harvest /n Run the "Harvest: Login Command" first.');
            return;
        }
        const harvest = new Harvest_1.default({
            accountId: accountId,
            accessToken: accessToken
        });
        const currentTaskId = context.globalState.get('currentTaskId') || '';
        if (!currentTaskId) {
            vscode.window.showWarningMessage('There is no current task stored.');
            return;
        }
        let timeEntryResponse;
        try {
            timeEntryResponse = yield axios_1.default.patch(`https://api.harvestapp.com/v2/time_entries/${currentTaskId}/stop`, {}, { headers: harvest.headers });
        }
        catch (err) {
            console.log(err);
            vscode.window.showErrorMessage('Issue stoping timer with Harvest.');
            return;
        }
        vscode.window.showInformationMessage('Harvest Timer Stopped');
        yield context.globalState.update('currentTaskId', '');
    }));
}
exports.default = StopTimer;
//# sourceMappingURL=GetIssues.js.map