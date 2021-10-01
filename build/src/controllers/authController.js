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
exports.signIn = exports.signUp = void 0;
const userService_1 = require("../services/User/userService");
const roleService_1 = require("../services/Role/roleService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../server/config"));
const _userService = new userService_1.userService();
const _roleService = new roleService_1.roleService();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password, phoneNumber, roles } = req.body;
    const userInput = yield _userService.userParse({ username, password, phoneNumber, roles });
    if (userInput == null) {
        res.json({ response: 'Input Data Could Not Be Parsed' });
    }
    else {
        if (roles) {
            userInput.roles = (_a = (yield _roleService.getValidIdListFromRoleFieldList(roles, 'role'))) === null || _a === void 0 ? void 0 : _a.map(role => role._id);
        }
        else {
            userInput.roles = [yield _roleService.getRoleIdByRolenameAsync('EndClient')];
        }
        if ((yield _userService.userExistsByUsernameAsync(username))) {
            res.json({ response: 'User Already Exists' });
        }
        else {
            const encryptedPassword = yield _userService.encryptPasswordAsync(userInput.password);
            if (encryptedPassword == null) {
                res.json({ response: 'Error Update Password could not be encrypted' });
            }
            else {
                userInput.password = encryptedPassword;
                const user = yield _userService.createUserAsync(userInput);
                if (user == null) {
                    res.json({ response: 'User Could Not Be Created' });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.SECRET, {
                        expiresIn: 86400 //24 Hours
                    });
                    res.status(200).json({ token });
                }
            }
        }
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    var user = yield _userService.getUserByUsernameAsync(username);
    if (!user)
        return res.status(400).json({ Response: "User Not Found" });
    const matchPass = yield _userService.checkPasswordAsync(password, "" + user.password);
    if (!matchPass)
        return res.status(401).json({ token: null, message: 'Invalid Password' });
    var populatedUser = yield _userService.populateField(user, 'roles');
    if (!populatedUser)
        return res.status(400).json({ Response: "User Field Could Not Be Populated Found" });
    const token = jsonwebtoken_1.default.sign({ id: populatedUser._id }, config_1.default.SECRET, {
        expiresIn: 86400 //24 Hours
    });
    res.status(200).json({ token });
});
exports.signIn = signIn;
