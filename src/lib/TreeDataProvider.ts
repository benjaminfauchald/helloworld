import * as vscode from "vscode"
import axios from 'axios'
import Jira from '../Entities/Jira'
import JiraIssueInterface from '../Entities/Interfaces/JiraIssueInterface'
import GetJiraIssues from '../UseCases/Commands/GetJiraIssues'
import { strict } from "node:assert"

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {

 


  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem|null|undefined> = new vscode.EventEmitter<TreeItem|null|undefined>();

 

  data: TreeItem[];

  constructor() {
    this.data = [];
  }


  refresh(data: TreeItem): void {
    this._onDidChangeTreeData.fire(data);
  }
  
  getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {


    
        
      const GetJiraIssues = async (): Promise<any> => {
        const jira = new Jira()
        const url = "https://morphosis.atlassian.net/rest/api/3/search?jql=assignee=currentuser()"
          
        let userResponse: any
        try {
          userResponse = await axios.get(
            url,
            { headers : jira.headers }
          )
        } catch (err) {
          console.log(err)
        }
        
          const issue = {
            id: userResponse?.data?.id || 0,
            issueKey: userResponse?.data?.key || '',
            issueType: userResponse?.data?.key || '',
            project: userResponse?.data?.key || ''
          }

        // console.log `ID: ${issue.id}`
        // console.log `Key: ${issue.issueKey}`
      
        let jiraIssue: string
        let jiraIssues:TreeItem[]; 
        jiraIssues = [] 

        let i=0
        let summary: string
        let key: string
        const data = userResponse.data

        for (i = 0; i < data.issues.length; i++) {
          key = data?.issues[i]?.key
          summary = data?.issues[i]?.fields?.summary || ''
           
          // console.log(key)
          // console.log(summary)

          //key always has a value, but lets check description
          jiraIssue = `${data?.issues[i]?.key}`

          if(summary) {
            // console.log(`I have something for ${key}`);
            jiraIssue = jiraIssue + " - " + summary
          } else {
            // console.log(`Nothing for ${key} here...`)
          }


          let jiraTreeItem = new TreeItem(jiraIssue)

          jiraTreeItem.command = {
            command: "taskOutline.selectNode",
            title: "Select Node",
            arguments: [jiraTreeItem]
          };  
         
          jiraIssues.push(jiraTreeItem)

        }

        return jiraIssues
      }




      let my_data = GetJiraIssues() 
      if (my_data === undefined)
      { 
        let error_data  = [new TreeItem('Error, could not connect to JIRA')]
        return error_data
      }
      else
      {
        return my_data;
      }     
    }
    return element.children;
  }




}


class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;

  // command = {
  //   "title": "Show Test",
  //   "command": "harvest-vscode.Hello('`${TreeItem.name}`')",
  // } 

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}




 export default TreeDataProvider