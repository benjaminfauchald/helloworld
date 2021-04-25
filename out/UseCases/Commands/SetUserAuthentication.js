"use strict";
///<reference path="./Harvest.ts">
///<reference path="./User.ts">
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
const Harvest_1 = require("../../Entities/Harvest");
const Harvest_2 = require("../../Entities/Harvest");
function SetUserAuthentication(context) {
    return vscode.commands.registerCommand('harvest-vscode.login', () => __awaiter(this, void 0, void 0, function* () {
        new Harvest_1.default().destructor();
        new Harvest_2.default().destructor();
        const accountId = yield vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'Harvest Acount Id'
        });
        if (!accountId) {
            vscode.window.showErrorMessage('No Account Id Proveded');
            return;
        }
        const accessToken = yield vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'Harvest Access Token',
            password: true
        });
        if (!accessToken) {
            vscode.window.showErrorMessage('No Access Token Proveded');
            return;
        }
        yield context.globalState.update('accountId', accountId);
        yield context.globalState.update('accessToken', accessToken);
        new Harvest_1.default({
            accountId: accountId,
            accessToken: accessToken
        });
    }));
}
exports.default = SetUserAuthentication;
//# sourceMappingURL=SetUserAuthentication.js.map