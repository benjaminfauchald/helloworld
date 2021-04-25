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
const getProjectsAssignments = () => __awaiter(void 0, void 0, void 0, function* () {
    const harvest = new Harvest_1.default();
    const projectResponses = yield _getManyProjectPagesFromApi(harvest);
    let projects = [];
    projectResponses.forEach((reponse) => {
        const projectResponss = reponse.data.project_assignments.map((p) => {
            return {
                id: p.project.id,
                name: p.project.name,
                tasks: p.task_assignments.map((t) => {
                    return {
                        id: t.task.id,
                        name: t.task.name
                    };
                })
            };
        });
        projects = [...projects, ...projectResponss];
    });
    return projects;
});
let projectPageRresonses = [];
const _getManyProjectPagesFromApi = (harvest, nextPageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let projectsResponse;
    try {
        projectsResponse = yield axios_1.default.get(nextPageUrl || 'https://api.harvestapp.com/v2/users/me/project_assignments', { headers: harvest.headers });
        projectPageRresonses.push(projectsResponse);
        if (projectsResponse.data.links.next)
            yield _getManyProjectPagesFromApi(harvest, projectsResponse.data.links.next);
    }
    catch (err) {
        console.log(err);
    }
    return projectPageRresonses;
});
exports.default = getProjectsAssignments;
//# sourceMappingURL=getProjectsAssignments.js.map