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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// User schema
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
        unique: true
        //required: true, 
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
// method
exports.UserSchema.methods.methodExample = function () {
    return "Method Working";
};
// static method
exports.UserSchema.statics.cypherPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(15);
        return yield bcryptjs_1.default.hash(password, salt);
    });
};
exports.UserSchema.statics.comparePassword = function (password, recievedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, recievedPassword);
    });
};
exports.UserSchema.statics.findByUserName = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ username });
    });
};
exports.UserSchema.statics.findByUserName = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ username });
    });
};
exports.UserSchema.statics.findByUserName = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ username });
    });
};
