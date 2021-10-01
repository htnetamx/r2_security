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
exports.deleteRoleByRoleName = exports.updateRoleByRoleName = exports.createRole = exports.getRoleByRoleName = exports.getAllRoles = void 0;
const roleService_1 = require("../services/Role/roleService");
const _roleService = new roleService_1.roleService();
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allRoles = yield _roleService.getAllRolesAsync();
    (allRoles == null) ? res.json({ response: 'No Roles In Data Base' }) : res.status(200).json(allRoles);
});
exports.getAllRoles = getAllRoles;
const getRoleByRoleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rolename } = req.params;
    const role = yield _roleService.getRoleByRolenameAsync(rolename);
    (role == null) ? res.json({ response: 'Role Not Found' }) : res.status(200).json(role);
});
exports.getRoleByRoleName = getRoleByRoleName;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleInput = yield _roleService.roleParse(req.body);
    const role = yield _roleService.createRoleAsync(roleInput);
    (role == null) ? res.json({ response: 'Role Could Not Be Created' }) : res.status(200).json(role);
});
exports.createRole = createRole;
const updateRoleByRoleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rolename } = req.params;
    let roleInput = _roleService.roleParse(req.body);
    const role = yield _roleService.updateRoleByRolenameAsync(rolename, roleInput);
    (role == null) ? res.json({ response: 'Role Could Not Be Updated' }) : res.status(200).json(role);
});
exports.updateRoleByRoleName = updateRoleByRoleName;
const deleteRoleByRoleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rolename } = req.params;
    const role = yield _roleService.deleteRoleByRolenameAsync(rolename);
    (role == null) ? res.json({ response: 'Role Not Found' }) : res.status(200).json({ response: 'Role Deleted Succesfully' });
});
exports.deleteRoleByRoleName = deleteRoleByRoleName;
