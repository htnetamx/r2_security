"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const domain = "localhost";
const dataBaseName = "r2_security";
const MONGO_URI = 'mongodb://' + domain + "/" + dataBaseName;
mongoose_1.default.connect(MONGO_URI)
    .then(db => console.log("DB is connected"))
    .catch(error => console.log(error));
