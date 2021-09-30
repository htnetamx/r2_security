"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRole = void 0;
const mongoose_1 = require("mongoose");
const role_1 = require("../../repositories/role");
exports.IRole = (0, mongoose_1.model)('Role', role_1.RoleSchema);
