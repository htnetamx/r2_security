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
const user_1 = require("../../repositories/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class userService {
    constructor() {
    }
    ;
    encryptPasswordAsync(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(15);
            return yield bcryptjs_1.default.hash(password, salt);
        });
    }
    ;
    checkPasswordAsync(password, recievedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, recievedPassword);
        });
    }
    ;
    getAllUsersAsync(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.find();
        });
    }
    ;
    findByUserNameAsync(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const hey = yield user_1.User.findOne({ username });
            console.log(hey);
            return null;
        });
    }
    ;
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles } = user;
            const newUser = new user_1.User({ username, password: yield this.encryptPasswordAsync(password.toString()), firstName, lastName, email, zipPostalCode, address1, phoneNumber, company, country, stateProvince, city, address2, createdOnUtc, updatedOnUtc, roles });
            console.log(newUser);
            try {
                return yield newUser.save();
            }
            catch (_a) {
                return null;
            }
            return null;
        });
    }
    ;
}
exports.userService = userService;
