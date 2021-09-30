"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("./schema");
exports.User = (0, mongoose_1.model)('User', schema_1.UserSchema);
