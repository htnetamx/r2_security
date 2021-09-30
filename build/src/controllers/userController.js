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
const IUser_1 = require("../services/User/IUser");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield IUser_1.IUser.find();
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const getUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield IUser_1.IUser.findByUserNameAsync(username);
    (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json(user);
});
exports.getUserByUserName = getUserByUserName;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles } = req.body;
    const newUser = new IUser_1.IUser({ username, password: password, firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles });
    console.log(yield IUser_1.IUser.getAllUsersAsync(password));
    //console.log(await IUser.findByUserNameAsync(password));
    //console.log(await IUser.createUserAsync(password));
    //console.log(await IUser.comparePasswordAsync(password,"123"));
    //console.log(await IUser.cypherPasswordAsync(password));
    console.log(newUser);
    /*
    IUser.createUserAsync({username,password: password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles});
    console.log(newUser);

    /*
    try{
        const userSaved=await newUser.save();
        res.json(userSaved);
    }
    catch(error){
        res.json({"Error":error});
    }*/
});
exports.createUser = createUser;
const updateUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield IUser_1.IUser.findOneAndUpdate({ username }, req.body, { new: true });
    (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json(user);
});
exports.updateUserByUserName = updateUserByUserName;
const deleteUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    console.log(username);
    const user = yield IUser_1.IUser.findOneAndDelete({ Username: username });
    console.log(user);
    (user == null) ? res.json({ response: 'User Not Found' }) : res.status(200).json({ response: 'User Deleted Succesfully' });
});
exports.deleteUserByUserName = deleteUserByUserName;
