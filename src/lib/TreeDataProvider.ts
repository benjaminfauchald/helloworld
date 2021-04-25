import * as vscode from "vscode"
import axios from 'axios'
import Jira from '../Entities/Jira'
import JiraIssueInterface from '../Entities/Interfaces/JiraIssueInterface'
import GetJiraIssues from '../UseCases/Commands/GetJiraIssues'

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

  data: TreeItem[];

  constructor() {
    this.data = [new TreeItem('cars', [
      new TreeItem(
          'Ford', [new TreeItem('Fiesta'), new TreeItem('Focus'), new TreeItem('Mustang')]),
      new TreeItem(
          'BMW', [new TreeItem('320'), new TreeItem('X3'), new TreeItem('X5')])
    ])];
  }

  getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {


    
        
      const GetJiraIssues = async (): Promise<JiraIssueInterface> => {
        const jira = new Jira()
        const key = "MOPS-10"
        const url = `https://morphosis.atlassian.net/rest/api/3/issue/${key}/?fields=timetracking`
          
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

        console.log `ID: ${issue.id}`
        console.log `Key: ${issue.issueKey}`
      
        console.log(await userResponse?.data)
        return issue
      }



      console.log(GetJiraIssues())







      let my_data = [new TreeItem('BARS', [
        new TreeItem(
            'Ford', [new TreeItem('Fiesta'), new TreeItem('Focus'), new TreeItem('Mustang')]),
        new TreeItem(
            'BMW', [new TreeItem('320'), new TreeItem('X3'), new TreeItem('X5')])
      ])];

      return my_data;
    }
    return element.children;
  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}

 export default TreeDataProvider