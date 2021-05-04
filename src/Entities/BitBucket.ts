import { DebugConsoleMode } from "vscode";
import axios from 'axios'
import BitBucketInterface from "./Interfaces/BitBucketInterface";

let instance: BitBucket | null = null


class BitBucket {
    BITBUCKET_USERNAME: string
    BITBUCKET_PASSWORD: string
    BITBUCKET_URL: string
  static headers: any;

    constructor (props?: BitBucketInterface) {
    if (!instance) instance = this
    this.BITBUCKET_USERNAME = props?.BITBUCKET_USERNAME || ''
    this.BITBUCKET_PASSWORD = props?.BITBUCKET_PASSWORD || ''
    this.BITBUCKET_URL      = props?.BITBUCKET_URL || ''
    return instance
  }

  destructor (): void {
    instance = null
  }

  public GetBitBucketCommits = async (): Promise<any> => {
      const bitBucket = new BitBucket()
      const url = this.BITBUCKET_URL + "/commits?" + "updated_on <= 2021-01-10"     // base url plus verb plus params
        
      let userResponse: any
      try {
        userResponse = await axios.get(
          url,
          { headers : this.headers }
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
      const data = userResponse.data

      return data 
    }


  // OK, se we use standard BASIC Auth here

    get headers () {
      var auth = Buffer.from(this.BITBUCKET_USERNAME + ':' + this.BITBUCKET_PASSWORD).toString('base64')
      let header: string


      return {
        "Authorization" : "`Basic ${auth}`"
      }

    }




  get props (): BitBucketInterface {
    return {
        BITBUCKET_USERNAME: this.BITBUCKET_USERNAME,
        BITBUCKET_PASSWORD: this.BITBUCKET_PASSWORD,
        BITBUCKET_URL: this.BITBUCKET_URL,
    }
  }
}

export default BitBucket