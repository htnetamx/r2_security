"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleCtrl = __importStar(require("../controllers/roleController"));
const middlewares_1 = require("../middlewares");
class RoleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', [
            middlewares_1.authJWT.verifyToken,
            middlewares_1.authJWT.isAdmin,
        ], roleCtrl.getAllRoles);
        this.router.get('/:rolename', [
            middlewares_1.authJWT.verifyToken,
            middlewares_1.authJWT.isAdmin
        ], roleCtrl.getRoleByRoleName);
        this.router.post('/create', [
            middlewares_1.authJWT.verifyToken,
            middlewares_1.authJWT.isAdmin,
            middlewares_1.roleVerification.checkInput,
            middlewares_1.roleVerification.checkDuplicates,
            middlewares_1.roleVerification.checkValidRelations
        ], roleCtrl.createRole);
        this.router.put('/:rolename', [
            middlewares_1.authJWT.verifyToken,
            middlewares_1.authJWT.isAdmin,
            middlewares_1.roleVerification.checkInput,
            middlewares_1.roleVerification.checkDuplicates,
            middlewares_1.roleVerification.checkValidRelations
        ], roleCtrl.updateRoleByRoleName);
        this.router.delete('/:rolename', [
            middlewares_1.authJWT.verifyToken,
            middlewares_1.authJWT.isAdmin
        ], roleCtrl.deleteRoleByRoleName);
    }
}
const roleRoutes = new RoleRoutes();
exports.default = roleRoutes.router;
