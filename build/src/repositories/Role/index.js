"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("./schema");
exports.Role = (0, mongoose_1.model)('Role', schema_1.RoleSchema);
