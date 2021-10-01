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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInput = void 0;
const checkInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, phoneNumber } = req.body;
    if (username == null || username == '' || username == undefined) {
        return res.status(403).json({ Response: "Error: Empty/Null/Undefined Field: username Schema: User" });
    }
    if (password == null || password == '') {
        return res.status(403).json({ Response: "Error: Empty/Null/Undefined Field: password Schema: User" });
    }
    if (phoneNumber == null || phoneNumber == '') {
        return res.status(403).json({ Response: "Error: Empty/Null/Undefined Field: phoneNumber Schema: User" });
    }
    next();
});
exports.checkInput = checkInput;
exports.default = { checkInput: exports.checkInput };
