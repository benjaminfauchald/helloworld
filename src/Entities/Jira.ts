import JiraInterface from "./Interfaces/JiraInterface";

let instance: Jira | null = null

class Jira {
    JIRA_USERNAME: string
    JIRA_PASSWORD: string
    JIRA_API_URL: string
    JIRA_ACTION: string
    JIRA_QUERY: string
  static headers: any;

    constructor (props?: JiraInterface) {
    if (!instance) instance = this
    this.JIRA_USERNAME = props?.JIRA_USERNAME || ''
    this.JIRA_PASSWORD = props?.JIRA_PASSWORD || ''
    this.JIRA_API_URL = props?.JIRA_API_URL || ''
    this.JIRA_ACTION = props?.JIRA_ACTION || ''
    this.JIRA_QUERY = props?.JIRA_QUERY || ''

    return instance
  }

  destructor (): void {
    instance = null
  }

  get headers () {
      // OK, se we use standard BASIC Auth here, base64, dont forget to get to string, not array! ;)
      var auth = Buffer.from(this.JIRA_USERNAME + ':' + this.JIRA_PASSWORD).toString('base64')
      let header: string


      console.log(`real: 'Basic YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU='`)
      console.log(`data: 'Basic ${auth}'`)
      console.log(`this.JIRA_USERNAME: ${this.JIRA_USERNAME}`)
      console.log(`this.JIRA_PASSWORD: ${this.JIRA_PASSWORD}`)
      

      // return {
      //   "Authorization" : "`Basic ${auth}`"
      // }

      return {
        'Authorization': 'Basic YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU='
      }


    }

  get props (): JiraInterface {
    return {
      JIRA_USERNAME: this.JIRA_USERNAME,
      JIRA_PASSWORD: this.JIRA_PASSWORD,
      JIRA_API_URL: this.JIRA_API_URL,
      JIRA_ACTION: this.JIRA_ACTION,
      JIRA_QUERY: this.JIRA_QUERY
    }
  }
}

export default Jira