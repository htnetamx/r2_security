"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("../../repositories/user");
exports.userService = (0, mongoose_1.model)('User', user_1.UserSchema);
