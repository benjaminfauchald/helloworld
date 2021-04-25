import JiraInterface from "./Interfaces/JiraInterface";

let instance: Jira | null = null

class Jira {
    JIRA_USERNAME: string
    JIRA_PASSWORD: string
  static headers: any;

    constructor (props?: JiraInterface) {
    if (!instance) instance = this
    this.JIRA_USERNAME = props?.JIRA_USERNAME || ''
    this.JIRA_PASSWORD = props?.JIRA_PASSWORD || ''
    return instance
  }

  destructor (): void {
    instance = null
  }

  get headers () {
    //const auth = Buffer.from(this.JIRA_USERNAME + ':' + this.JIRA_PASSWORD,'base64');
    const auth = "YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU="
    return {
      'Authorization': 'Basic YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU='
    }
  }

  get props (): JiraInterface {
    return {
      JIRA_USERNAME: this.JIRA_USERNAME,
      JIRA_PASSWORD: this.JIRA_PASSWORD,
    }
  }
}

export default Jira