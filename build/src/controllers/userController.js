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
exports.deleteUserByUserName = exports.updateUserByUserName = exports.createUser = exports.getUserByUserName = exports.getAllUsers = void 0;
const userService_1 = require("../services/User/userService");
const _userService = new userService_1.userService();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield _userService.getAllUsersAsync();
    (allUsers == null) ? res.json({ response: 'No Users In Data Base' }) : res.status(200).json(allUsers);
});
exports.getAllUsers = getAllUsers;
const getUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield _userService.getUserByNameAsync(username);
    (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json(user);
});
exports.getUserByUserName = getUserByUserName;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = yield _userService.newUser(req.body);
    if (userInput == null) {
        res.json({ response: 'Input Data Could Not Be Parsed' });
    }
    else {
        const { password } = req.body;
        const encryptedPassword = yield _userService.encryptPasswordAsync(password);
        if (encryptedPassword == null) {
            res.json({ response: 'Error Update Password could not be encrypted' });
        }
        else {
            userInput.password = encryptedPassword;
            const user = yield _userService.createUserAsync(userInput);
            (user == null) ? res.json({ response: 'User Could Not Be Created' }) : res.status(201).json(user);
        }
    }
});
exports.createUser = createUser;
const updateUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const { password } = req.body;
    let userInput = _userService.newUser(req.body);
    if (userInput == null) {
        res.json({ response: 'Input Data Could Not Be Parsed' });
    }
    else {
        const isAdmin = true;
        if (isAdmin) {
            const encryptedPassword = yield _userService.encryptPasswordAsync(password);
            (encryptedPassword == null) ? res.json({ response: 'Error Update Password could not be encrypted' }) : userInput.password = encryptedPassword;
        }
        else {
            delete userInput['password'];
        }
        const user = yield _userService.updateUserByUsernameAsync(username, userInput);
        (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json(user);
    }
});
exports.updateUserByUserName = updateUserByUserName;
const deleteUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield _userService.deleteUserByUsernameAsync(username);
    (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json({ response: 'User Deleted Succesfully' });
});
exports.deleteUserByUserName = deleteUserByUserName;
