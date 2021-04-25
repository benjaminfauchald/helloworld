"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class ProjectCollection {
    constructor() {
        this.elements = [];
        this.addOne = (project) => {
            this.elements.push(project);
        };
        this.addMany = (projects) => {
            projects.forEach((p) => {
                this.elements.push(p);
            });
        };
        this.findById = (id) => {
            const project = this.elements.find((p) => {
                return p.id === id;
            });
            return project;
        };
        this.findByName = (name) => {
            const project = this.elements.find((p) => {
                return p.name === name;
            });
            return project;
        };
        if (!instance)
            instance = this;
        return instance;
    }
    destructor() {
        instance = null;
    }
}
exports.default = ProjectCollection;
//# sourceMappingURL=ProjectCollection.js.map