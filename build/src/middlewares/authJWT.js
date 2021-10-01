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
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../server/config"));
const userService_1 = require("../services/User/userService");
const roleService_1 = require("../services/Role/roleService");
const _userService = new userService_1.userService();
const _roleService = new roleService_1.roleService();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ Response: "No Token Provided" });
    token = token.toString();
    var id;
    try {
        id = jsonwebtoken_1.default.verify(token, config_1.default.SECRET).id;
    }
    catch (_a) {
        return res.status(403).json({ Response: "Token Not Valid" });
    }
    const user = yield _userService.getUserById(id);
    if (!user)
        return res.status(404).json({ Response: "No User Found" });
    req.user = user;
    next();
});
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rolesList = yield _roleService.getValidIdListFromRoleFieldList(req.user.roles, '_id');
    if (rolesList != null && rolesList.some(e => e.role === 'admin')) {
        next();
    }
    else {
        return res.status(403).json({ Response: "Unauthorized. Admin Role Required" });
    }
});
exports.isAdmin = isAdmin;
exports.default = { verifyToken: exports.verifyToken, isAdmin: exports.isAdmin };
