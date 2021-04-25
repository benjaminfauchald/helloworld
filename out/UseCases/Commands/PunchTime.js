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
const CurrentTimeEntry_1 = require("../../Entities/CurrentTimeEntry");
const ProjectCollection_1 = require("../../Entities/ProjectCollection");
const saveNewTimeEntry_1 = require("../saveNewTimeEntry");
const SetupHarvest_1 = require("../SetupHarvest");
function PunchTime(context) {
    return vscode.commands.registerCommand('harvest-vscode.punchTime', () => __awaiter(this, void 0, void 0, function* () {
        let projectCollection = new ProjectCollection_1.default();
        const isHarvestSetup = yield SetupHarvest_1.default(context);
        if (!isHarvestSetup)
            return;
        const projectNames = projectCollection.elements.map((p) => {
            return p.name;
        });
        const selectedProjectName = yield vscode.window.showQuickPick(projectNames, {
            ignoreFocusOut: true,
            placeHolder: 'Choost a Project'
        });
        if (!selectedProjectName) {
            vscode.window.showWarningMessage('Must select a project to push time');
            return;
        }
        const selectedProject = projectCollection.findByName(selectedProjectName);
        const taskNames = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.tasks.map((t) => {
            return t.name;
        });
        if (!taskNames) {
            vscode.window.showWarningMessage('No tasks defined for this project.');
            return;
        }
        const selectedTaskName = yield vscode.window.showQuickPick(taskNames, {
            ignoreFocusOut: true,
            placeHolder: 'Choost a Task'
        });
        if (!selectedTaskName) {
            vscode.window.showWarningMessage('Must select a task to push time');
            return;
        }
        const selectedTask = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.tasks.find((t) => {
            return t.name === selectedTaskName;
        });
        const notes = yield vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'Notes'
        });
        if (!notes) {
            vscode.window.showWarningMessage('Must add notes to puch time.');
            return;
        }
        const newTimeEntry = {
            projectId: selectedProject.id,
            taskId: selectedTask.id,
            date: new Date().toISOString(),
            notes: notes
        };
        const saveNewTimeEntryResponse = yield saveNewTimeEntry_1.default(newTimeEntry);
        const newTimeEntryId = saveNewTimeEntryResponse.id;
        const currentTimeEntry = new CurrentTimeEntry_1.default;
        currentTimeEntry.props = {
            id: newTimeEntryId,
            projectName: selectedProjectName,
            taskName: selectedTaskName,
            notes: notes
        };
        yield context.globalState.update('currentTaskId', newTimeEntryId);
        vscode.window.showInformationMessage(`${selectedProjectName} \n ${selectedTaskName} \n ${notes}`);
    }));
}
exports.default = PunchTime;
//# sourceMappingURL=PunchTime.js.map