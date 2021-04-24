import axios from 'axios'
import Jira from '../../Entities/Jira'
import IssueInterface from '../../Entities/Interfaces/IssueInterface'

const GetJiraIssues = async (): Promise<IssueInterface> => {
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
    key: userResponse?.data?.key || '',
    issueType: userResponse?.data?.key || '',
    project: userResponse?.data?.key || ''
  }

  console.log `ID: ${issue.id}`
  console.log `Key: ${issue.key}`
 
  return issue

}

export default GetJiraIssues