"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const role_1 = require("../../repositories/role");
exports.Role = (0, mongoose_1.model)('Role', role_1.RoleSchema);
