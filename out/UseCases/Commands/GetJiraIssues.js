"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Jira_1 = require("../../Entities/Jira");
const GetJiraIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    //const GetJiraIssues = async (): Promise<JiraIssueInterface> => {
    const jira = new Jira_1.default();
    const key = "MOPS-10";
    const url = `https://morphosis.atlassian.net/rest/api/3/issue/${key}/?fields=timetracking`;
    let userResponse;
    try {
        userResponse = yield axios_1.default.get(url, { headers: jira.headers });
    }
    catch (err) {
        console.log(err);
    }
    const issue = {
        id: ((_a = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _a === void 0 ? void 0 : _a.id) || 0,
        key: ((_b = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _b === void 0 ? void 0 : _b.key) || '',
        issueType: ((_c = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _c === void 0 ? void 0 : _c.key) || '',
        project: ((_d = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _d === void 0 ? void 0 : _d.key) || ''
    };
    console.log `ID: ${issue.id}`;
    console.log `Key: ${issue.key}`;
    //
    console.log(yield (userResponse === null || userResponse === void 0 ? void 0 : userResponse.data));
});
exports.default = GetJiraIssues;
//# sourceMappingURL=GetJiraIssues.js.map