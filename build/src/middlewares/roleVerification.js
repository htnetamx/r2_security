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
exports.checkDuplicates = exports.checkValidRelations = exports.checkInput = void 0;
const role_1 = __importDefault(require("../repositories/role"));
// Default Validators
const checkInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roleKeys = Object.keys(role_1.default.schema.paths).filter(k => k != '_id');
    const errorKeys = (Object.keys(req.body)).filter(k => !roleKeys.includes(k));
    if (errorKeys != null && errorKeys.length > 0) {
        return res.status(403).json({ Response: {
                Error: `Input parameters not valid`,
                Field: `Fields ${errorKeys} do not exist`,
                Schema: `Role`
            }
        });
    }
    const { role } = req.body;
    if (role == null || role == '' || role == undefined) {
        return res.status(403).json({ Response: {
                Error: `Error: Empty/Null/Undefined`,
                Field: `role`,
                Schema: `Role`
            }
        });
    }
    next();
});
exports.checkInput = checkInput;
const checkValidRelations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Does not have other schemas in its model
    next();
});
exports.checkValidRelations = checkValidRelations;
const checkDuplicates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    var user = yield role_1.default.find({ role });
    if (role) {
        if (user) {
            return res.status(403).json({ Response: {
                    Error: `Duplicated Field`,
                    Field: `role`,
                    Schema: `Role`
                }
            });
        }
    }
    next();
});
exports.checkDuplicates = checkDuplicates;
exports.default = { checkInput: exports.checkInput, checkValidRelations: exports.checkValidRelations, checkDuplicates: exports.checkDuplicates };
