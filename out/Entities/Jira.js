"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class Jira {
    constructor(props) {
        if (!instance)
            instance = this;
        this.JIRA_USERNAME = (props === null || props === void 0 ? void 0 : props.JIRA_USERNAME) || '';
        this.JIRA_PASSWORD = (props === null || props === void 0 ? void 0 : props.JIRA_PASSWORD) || '';
        return instance;
    }
    destructor() {
        instance = null;
    }
    get headers() {
        //const auth = Buffer.from(this.JIRA_USERNAME + ':' + this.JIRA_PASSWORD,'base64');
        const auth = "YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU=";
        return {
            'Authorization': 'Basic YmVuamFtaW5AbW9ycGhvcy5pczp0T0g1d3RDb3BkTFJlNHBjYXY4dEMxNkU='
        };
    }
    get props() {
        return {
            JIRA_USERNAME: this.JIRA_USERNAME,
            JIRA_PASSWORD: this.JIRA_PASSWORD,
        };
    }
}
exports.default = Jira;
//# sourceMappingURL=Jira.js.map