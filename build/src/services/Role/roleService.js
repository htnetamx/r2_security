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
exports.roleService = void 0;
const role_1 = __importDefault(require("../../repositories/role"));
class roleService {
    //Properties
    //Attribute1: type;
    constructor() {
        //Blank
    }
    ;
    //Mehtods
    //Deconstructer
    roleParse(params) {
        const { role } = params;
        return { role };
    }
    //CRUDE
    createRoleAsync(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new role_1.default(role)).save();
            }
            catch (error) {
                console.log("Error Guardando");
                console.log(error);
                return null;
            }
        });
    }
    ;
    updateRoleByRolenameAsync(role, roleInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield role_1.default.findOneAndUpdate({ role }, roleInfo, { new: true });
            }
            catch (error) {
                console.log("Error Updating Role");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    deleteRoleByRolenameAsync(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield role_1.default.findOneAndDelete({ role });
            }
            catch (error) {
                console.log("Error Deleting Role");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    //Search Methods
    getAllRolesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesList = yield role_1.default.find();
                if (rolesList.length == 0 || rolesList == null || rolesList == undefined) {
                    return null;
                }
                else {
                    return rolesList;
                }
            }
            catch (error) {
                console.log("Error in finding All Roles");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    getRoleByRolenameAsync(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield role_1.default.findOne({ role });
            }
            catch (error) {
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    getRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield role_1.default.findById(id);
            }
            catch (error) {
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        });
    }
    ;
    roleExistsByRolenameAsync(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return ((yield role_1.default.findOne({ role })) != null);
            }
            catch (error) {
                console.log("Error in finding Role");
                //console.log(error);
                return false;
            }
        });
    }
    ;
    getValidIdListFromRoleFieldList(roles, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let object = { param: { $in: roles } };
                object[field] = object.param;
                delete object.param;
                const rolesList = yield role_1.default.find(object);
                if (rolesList.length == 0 || rolesList == null || rolesList == undefined) {
                    return null;
                }
                else {
                    return rolesList;
                }
            }
            catch (error) {
                console.log("Error in finding valid Roles");
                //console.log(error);
                return null;
            }
        });
    }
    getRoleIdByRolenameAsync(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundRole = yield role_1.default.findOne({ role });
                return (foundRole == null) ? null : foundRole._id;
            }
            catch (error) {
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        });
    }
    ;
}
exports.roleService = roleService;
