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
        unique: true
    },
}, {
    timestamps: true,
    versionKey: false
});
// method
exports.RoleSchema.methods.methodExample = function () {
    return "Method Working";
};
// static method
exports.RoleSchema.statics.findByRole = function (role) {
    return this.findOne({ role });
};
