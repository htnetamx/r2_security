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
exports.checkInputPassword = exports.checkDuplicates = exports.checkValidRelations = exports.checkInput = void 0;
const role_1 = __importDefault(require("../repositories/role"));
const user_1 = __importDefault(require("../repositories/user"));
// Default Validators
const checkInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userKeys = Object.keys(user_1.default.schema.paths).filter(k => k != '_id');
    const errorKeys = (Object.keys(req.body)).filter(k => !userKeys.includes(k));
    if (errorKeys != null && errorKeys.length > 0) {
        return res.status(403).json({ Response: {
                Error: `Input parameters not valid`,
                Field: `Fields ${errorKeys} do not exist`,
                Schema: `User`
            }
        });
    }
    const { username, password, phoneNumber } = req.body;
    if (username == null || username == '' || username == undefined) {
        return res.status(403).json({ Response: {
                Error: `Error: Empty/Null/Undefined`,
                Field: `username`,
                Schema: `User`
            }
        });
    }
    if (password == null || password == '') {
        return res.status(403).json({ Response: {
                Error: `Error: Empty/Null/Undefined`,
                Field: `password`,
                Schema: `User`
            }
        });
    }
    if (phoneNumber == null || phoneNumber == '') {
        return res.status(403).json({ Response: {
                Error: `Error: Empty/Null/Undefined`,
                Field: `phoneNumber`,
                Schema: `User`
            }
        });
    }
    next();
});
exports.checkInput = checkInput;
const checkValidRelations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roles } = req.body;
    if (roles) {
        const dataBaseRoles = (yield role_1.default.find()).map(r => r.role);
        const errorRoles = roles.filter(r => !dataBaseRoles.includes(r));
        if (errorRoles != null && errorRoles.length > 0) {
            return res.status(403).json({ Response: {
                    Error: `Roles ${errorRoles} do not exist`,
                    Field: `roles`,
                    Schema: `User`
                }
            });
        }
    }
    next();
});
exports.checkValidRelations = checkValidRelations;
const checkDuplicates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, phoneNumber, email } = req.body;
    if (username) {
        var user = yield user_1.default.find({ username });
        if (user) {
            return res.status(403).json({ Response: {
                    Error: `Duplicated Field`,
                    Field: `username`,
                    Schema: `User`
                }
            });
        }
    }
    if (phoneNumber) {
        user = yield user_1.default.find({ phoneNumber });
        if (user) {
            return res.status(403).json({ Response: {
                    Error: `Duplicated Field`,
                    Field: `phoneNumber`,
                    Schema: `User`
                }
            });
        }
    }
    if (email) {
        user = yield user_1.default.find({ email });
        if (user) {
            return res.status(403).json({ Response: {
                    Error: `Duplicated Field`,
                    Field: `email`,
                    Schema: `User`
                }
            });
        }
    }
    next();
});
exports.checkDuplicates = checkDuplicates;
// Extra Validations
const checkInputPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userKeys = ['password'];
    const errorKeys = (Object.keys(req.body)).filter(k => !userKeys.includes(k));
    if (errorKeys != null && errorKeys.length > 0) {
        return res.status(403).json({ Response: {
                Error: `Input parameters not valid`,
                Field: `Fields ${errorKeys} not valid to set password`,
                Schema: `User`
            }
        });
    }
    const { password } = req.body;
    if (password == null || password == '') {
        return res.status(403).json({ Response: {
                Error: `Error: Empty/Null/Undefined`,
                Field: `password`,
                Schema: `User`
            }
        });
    }
    next();
});
exports.checkInputPassword = checkInputPassword;
exports.default = { checkInput: exports.checkInput, checkValidRelations: exports.checkValidRelations, checkDuplicates: exports.checkDuplicates, checkInputPassword: exports.checkInputPassword };
