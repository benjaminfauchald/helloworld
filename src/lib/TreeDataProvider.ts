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

        console.log `ID: ${issue.id}`
        console.log `Key: ${issue.issueKey}`
      
        let jiraIssue: string
        let jiraIssues:TreeItem[]; 
        jiraIssues = [] 

        let i=0
        let summary: string
        let key: string
        const data = userResponse.data

        for (i = 0; i < data.issues.length; i++) {
          key = data?.issues[i]?.key
          summary = data?.issues[i]?.fields?.summary
           
          console.log(key)
          console.log(summary)

          //key always has a value, but lets check description
          jiraIssue = `${data?.issues[i]?.key}`

          if(summary) {
            console.log(`I have something for ${key}`);
            jiraIssue = jiraIssue + " - " + summary
          } else {
            console.log(`Nothing for ${key} here...`)
          }


         
          jiraIssues.push(new TreeItem(jiraIssue))

        }


        console.log(await userResponse?.data)
        return jiraIssues
      }



      console.log(GetJiraIssues())


      // let my_data = [new TreeItem('BARS', [
      //   new TreeItem(
      //       'Ford', [new TreeItem('Fiesta'), new TreeItem('Focus'), new TreeItem('Mustang')]),
      //   new TreeItem(
      //       'BMW', [new TreeItem('320'), new TreeItem('X3'), new TreeItem('X5')])
      // ])];

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

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}

 export default TreeDataProvider