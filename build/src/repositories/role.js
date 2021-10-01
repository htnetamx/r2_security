"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const mongoose_1 = require("mongoose");
;
// Role Schema
exports.RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
}, {
    timestamps: true,
    versionKey: false
});
// Role Model
exports.default = (0, mongoose_1.model)('Role', exports.RoleSchema);
