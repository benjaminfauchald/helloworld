import * as vscode from 'vscode';
import axios from 'axios'
import Jira from '../Entities/Jira'
import TreeDataProvider from './TreeDataProvider'
import GetJiraIssues from '../UseCases/Commands/GetJiraIssues'
import JiraIssueInterface from '../Entities/Interfaces/JiraIssueInterface'

import JiraTest from '../UseCases/Commands/JiraTest'

import { tasks } from 'vscode';


export class TaskProvider implements vscode.TreeDataProvider<TreeTask> {
  
    constructor(private context: vscode.ExtensionContext) {
  
    }

    public async getChildren(task?: TreeTask): Promise<TreeTask[]> {
  
        // let tasks = await vscode.tasks.fetchTasks().then(function (value) {
        //     return value;
        // });
      



        console.log(GetJiraIssues())
        console.log(JiraTest())
        


        let tasks = ["mps10","mps12","mps150","mps13","mps1550"]

        let treeTasks: TreeTask[] = [];

        if (tasks.length !== 0) {
          for (var i = 0; i < tasks.length; i++ ) {                             
            treeTasks[i] = new TreeTask(tasks[i], tasks[i], vscode.TreeItemCollapsibleState.None, { 
                  command: 'taskOutline.executeTask', 
                  title: "Execute", 
                  arguments: [tasks[i], ]
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
    }

    getTreeItem(task: TreeTask): vscode.TreeItem {
        return task;
    }

}

export default TaskProvider

class TreeTask extends vscode.TreeItem {

    type: string;
    
    constructor(
        type: string, 
        label: string, 
        collapsibleState: vscode.TreeItemCollapsibleState,
        command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.type = type;
        this.command = command;
    }
     
}