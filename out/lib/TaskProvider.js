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
exports.TaskProvider = void 0;
const vscode = require("vscode");
class TaskProvider {
    constructor(context) {
        this.context = context;
    }
    getChildren(task) {
        return __awaiter(this, void 0, void 0, function* () {
            // let tasks = await vscode.tasks.fetchTasks().then(function (value) {
            //     return value;
            // });
            let tasks = ["mps10", "mps12", "mps150", "mps13", "mps1550"];
            let treeTasks = [];
            if (tasks.length !== 0) {
                for (var i = 0; i < tasks.length; i++) {
                    treeTasks[i] = new TreeTask(tasks[i], tasks[i], vscode.TreeItemCollapsibleState.None, {
                        command: 'taskOutline.executeTask',
                        title: "Execute",
                        arguments: [tasks[i],]
                    });
                }
            }
            //   let treeTasks: TreeTask[] = [];
            // if (tasks.length !== 0) {
            //   for (var i = 0; i < tasks.length; i++ ) {                             
            //     treeTasks[i] = new TreeTask(tasks[i].definition.type, tasks[i].name, vscode.TreeItemCollapsibleState.None, { 
            //           command: 'taskOutline.executeTask', 
            //           title: "Execute", 
            //           arguments: [tasks[i], ]
            //      });
            //    }
            // }
            return treeTasks;
        });
    }
    getTreeItem(task) {
        return task;
    }
}
exports.TaskProvider = TaskProvider;
exports.default = TaskProvider;
class TreeTask extends vscode.TreeItem {
    constructor(type, label, collapsibleState, command) {
        super(label, collapsibleState);
        this.type = type;
        this.command = command;
    }
}
//# sourceMappingURL=TaskProvider.js.map