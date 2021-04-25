"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance;
class User {
    constructor(props) {
        if (!instance)
            instance = this;
        this.id = (props === null || props === void 0 ? void 0 : props.id) || 0;
        this.firstName = (props === null || props === void 0 ? void 0 : props.firstName) || '';
        this.lastName = (props === null || props === void 0 ? void 0 : props.lastName) || '';
        this.email = (props === null || props === void 0 ? void 0 : props.email) || '';
        this.avatar = (props === null || props === void 0 ? void 0 : props.avatar) || '';
        return instance;
    }
    destructor() {
        instance = null;
    }
    get props() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            avatar: this.avatar
        };
    }
}
exports.default = User;
