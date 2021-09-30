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
exports.userService = void 0;
const user_1 = __importDefault(require("../../repositories/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class userService {
    //Properties
    //Attribute1: type;
    constructor() {
        //Blank
    }
    ;
    //Mehtods
    //Deconstructer
    userParse(params) {
        const { username, password, firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles } = params;
        //Validadores
        if (username == null || username == '') {
            console.log("Error en Campo Username De Modelo User");
            return null;
        }
        if (password == null || password == '') {
            console.log("Error en Campo Password De Modelo User");
            return null;
        }
        if (phoneNumber == null || phoneNumber == '') {
            console.log("Error en Campo phoneNumber De Modelo User");
            return null;
        }
        return { username, password, firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles };
    }
    //CRUDE
    getAllUsersAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield user_1.default.find();
                if (usersList.length == 0 || usersList == null) {
                    return null;
                }
                else {
                    return usersList;
                }
            }
            catch (error) {
                console.log("Error in finding All Users");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    getUserByNameAsync(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findOne({ username });
            }
            catch (error) {
                console.log("Error in finding User");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user.save();
            }
            catch (error) {
                console.log("Error Guardando");
                console.log(error);
                return null;
            }
        });
    }
    ;
    updateUserByUsernameAsync(username, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findOneAndUpdate({ username }, userInfo, { new: true });
            }
            catch (error) {
                console.log("Error Updating User");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    deleteUserByUsernameAsync(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findOneAndDelete({ username });
            }
            catch (error) {
                console.log("Error Deleting User");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    //Verification
    encryptPasswordAsync(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(15);
                return yield bcryptjs_1.default.hash(password, salt);
            }
            catch (error) {
                console.log("Error Encrypting Password");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    checkPasswordAsync(password, recievedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcryptjs_1.default.compare(password, recievedPassword);
            }
            catch (error) {
                console.log("Error Comparing Passwords");
                console.log(error);
                return null;
            }
        });
    }
    ;
}
exports.userService = userService;
