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
const Harvest_1 = require("../Entities/Harvest");
const saveNewTimeEntry = (timeEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const harvest = new Harvest_1.default();
    const body = {
        project_id: timeEntry.projectId,
        task_id: timeEntry.taskId,
        spent_date: timeEntry.date,
        notes: timeEntry.notes
    };
    let timeEntryResponse;
    try {
        timeEntryResponse = yield axios_1.default.post('https://api.harvestapp.com/v2/time_entries', body, { headers: harvest.headers });
    }
    catch (err) {
        console.log(err);
    }
    const createdTimeEntry = {
        id: timeEntryResponse.data.id,
        projectId: timeEntryResponse.data.project.id,
        date: timeEntryResponse.data.spent_date,
        taskId: timeEntryResponse.data.task.id,
        notes: timeEntryResponse.data.notes,
        isRunning: timeEntryResponse.data.is_running
    };
    return createdTimeEntry;
});
exports.default = saveNewTimeEntry;
//# sourceMappingURL=saveNewTimeEntry.js.map