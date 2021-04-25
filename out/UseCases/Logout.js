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
const Harvest_1 = require("../../Entities/Harvest");
const User_1 = require("../../Entities/User");
function Logout(context) {
    return vscode.commands.registerCommand('harvest-vscode.logout', () => __awaiter(this, void 0, void 0, function* () {
        new Harvest_1.default().destructor();
        new User_1.default().destructor();
        yield context.globalState.update('accountId', '');
        yield context.globalState.update('accessToken', '');
    }));
}
exports.default = Logout;
//# sourceMappingURL=Logout.js.map