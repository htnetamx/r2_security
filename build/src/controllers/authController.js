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
exports.signIn = exports.signUp = void 0;
const IUser_1 = require("../services/User/IUser");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, roles } = req.body;
    const newUser = new IUser_1.IUser({
        username,
        email,
        password: password,
        roles
    });
    try {
        const userSaved = yield newUser.save();
        res.json(userSaved);
    }
    catch (error) {
        res.json({ "Error": error });
    }
    console.log(req.body);
    res.json("Sign Up");
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("Sign In");
});
exports.signIn = signIn;
