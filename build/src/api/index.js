"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = __importDefault(require("../server/app"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', (req, res) => {
            res.json({
                author: app_1.default.get('pkg').name,
                description: app_1.default.get('pkg').description,
                version: app_1.default.get('pkg').version
            });
        });
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
