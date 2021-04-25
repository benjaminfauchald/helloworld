"use strict";
/// <reference path=""> 
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class Harvest {
    constructor(props) {
        if (!instance)
            instance = this;
        this.accountId = (props === null || props === void 0 ? void 0 : props.accountId) || '';
        this.accessToken = (props === null || props === void 0 ? void 0 : props.accessToken) || '';
        this.organization = (props === null || props === void 0 ? void 0 : props.organization) || '';
        return instance;
    }
    destructor() {
        instance = null;
    }
    get headers() {
        return {
            'Harvest-Account-ID': this.accountId,
            'Authorization': `Bearer ${this.accessToken}`
        };
    }
    get props() {
        return {
            accountId: this.accountId,
            accessToken: this.accessToken,
            organization: this.organization
        };
    }
}
exports.default = Harvest;
//# sourceMappingURL=Harvest.js.map