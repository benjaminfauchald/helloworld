"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance;
class CurrentTimeEntry {
    constructor() {
        if (!instance)
            instance = this;
        return instance;
    }
    set props(values) {
        if (values.id)
            this.id = values.id;
        if (values.taskName)
            this.taskName = values.taskName;
        if (values.projectName)
            this.projectName = values.projectName;
        if (values.notes)
            this.projectName = values.notes;
    }
    get props() {
        return {
            id: this.id,
            taskName: this.taskName,
            projectName: this.projectName,
            notes: this.notes
        };
    }
}
exports.default = CurrentTimeEntry;
//# sourceMappingURL=CurrentTimeEntry.js.map