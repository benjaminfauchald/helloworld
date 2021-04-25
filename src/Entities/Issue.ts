import IssueInterface from './Interfaces/IssueInterface'

class Issue {
  public id: number
  public key: string
  public issueType: string
  public project: string

  constructor (props: IssueInterface) {
    this.id = props.id
    this.key = props.key
    this.issueType = props.issueType
    this.project = props.project
  }

  get props (): IssueInterface {
    return {
      id: this.id,
      key: this.key,
      issueType: this.issueType,
      project: this.project,
    }
  }
}

export default Issue
