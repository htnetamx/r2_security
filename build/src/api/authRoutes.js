"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //this.router.post('/signup',authCtrl.signUp);
        //this.router.post('/signin',authCtrl.signIn);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
