"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.tasks = props.tasks;
    }
    get props() {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks
        };
    }
}
exports.default = Project;
//# sourceMappingURL=Project.js.map