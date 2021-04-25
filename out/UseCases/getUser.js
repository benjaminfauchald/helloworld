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
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const harvest = new Harvest_1.default();
    let userResponse;
    try {
        userResponse = yield axios_1.default.get('https://api.harvestapp.com/api/v2/users/me.json', { headers: harvest.headers });
    }
    catch (err) {
        console.log(err);
    }
    const user = {
        id: ((_a = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _a === void 0 ? void 0 : _a.id) || '',
        firstName: ((_b = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _b === void 0 ? void 0 : _b.first_name) || '',
        lastName: ((_c = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _c === void 0 ? void 0 : _c.last_name) || '',
        email: ((_d = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _d === void 0 ? void 0 : _d.email) || '',
        avatar: ((_e = userResponse === null || userResponse === void 0 ? void 0 : userResponse.data) === null || _e === void 0 ? void 0 : _e.avatar_url) || '',
    };
    return user;
});
exports.default = getUser;
//# sourceMappingURL=getUser.js.map