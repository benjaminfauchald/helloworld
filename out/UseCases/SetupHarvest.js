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
const Harvest_1 = require("../Entities/Harvest");
const Project_1 = require("../Entities/Project");
const ProjectCollection_1 = require("../Entities/ProjectCollection");
const User_1 = require("../Entities/User");
const getProjectsAssignments_1 = require("./getProjectsAssignments");
const getUser_1 = require("./getUser");
function SetupHarvest(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const harvest = new Harvest_1.default();
        let projectCollection = new ProjectCollection_1.default();
        let user = new User_1.default();
        const accountId = context.globalState.get('accountId') || '';
        const accessToken = context.globalState.get('accessToken') || '';
        if (!accountId || !accessToken) {
            vscode.window.showErrorMessage('Run "Harvest: Login" Command before trying to puch time');
            return false;
        }
        harvest.accountId = accountId;
        harvest.accessToken = accessToken;
        if (!user.id) {
            vscode.window.showInformationMessage('Authenticating with Harvest');
            let userProps;
            try {
                userProps = yield getUser_1.default();
            }
            catch (err) {
                console.log(err);
                vscode.window.showErrorMessage('Could not retrieve user data from Harvest');
                return false;
            }
            if (!userProps.id) {
                vscode.window.showErrorMessage('Could not retrieve user data from Harvest');
                return false;
            }
            user.destructor();
            user = new User_1.default(userProps);
        }
        if (projectCollection.elements.length <= 0) {
            vscode.window.showInformationMessage('Getting Projects from Harvest');
            try {
                let projectsData = yield getProjectsAssignments_1.default();
                const projects = projectsData.map((p) => {
                    return new Project_1.default(p);
                });
                projectCollection.addMany(projects);
            }
            catch (err) {
                console.log(err);
                vscode.window.showErrorMessage('Could not retrieve uer projects');
                return false;
            }
        }
        return true;
    });
}
exports.default = SetupHarvest;
//# sourceMappingURL=SetupHarvest.js.map