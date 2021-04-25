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
const readGitUser = require("read-git-user");
function GitEmail(context) {
    return vscode.commands.registerCommand('harvest-vscode.GitInfo', () => __awaiter(this, void 0, void 0, function* () {
        var gitUser = yield readGitUser();
        //=> {username: RocktimsSaikia, email: rocktimthedev@gmail.com}
        Promise.resolve(JSON.stringify(gitUser))
            .then(function () { vscode.window.showInformationMessage('Hello ' + gitUser.email); })
            .catch(function () { vscode.window.showInformationMessage('Not Found'); });
    }));
}
exports.default = GitEmail;
//# sourceMappingURL=GitInfo.js.map