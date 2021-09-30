"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
;
// User Schema
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        unique: true,
        //required: true,
        sparse: true
    },
    zipPostalCode: {
        type: String,
        //required: true
    },
    address1: {
        type: String,
        //required: true
    },
    company: {
        type: String
    },
    country: {
        type: String
    },
    stateProvince: {
        type: String
    },
    city: {
        type: String
    },
    address2: {
        type: String
    },
    createdOnUtc: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedOnUtc: {
        type: Date,
        required: true,
        default: Date.now()
    },
    roles: [{
            ref: "Role",
            type: mongoose_1.Schema.Types.ObjectId
        }]
}, {
    //timestamps: true,
    versionKey: false
});
// User Model
exports.default = (0, mongoose_1.model)('User', exports.UserSchema);
