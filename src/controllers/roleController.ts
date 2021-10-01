import {Request,Response} from "express";
import  {roleService} from "../services/Role/roleService";

const _roleService = new roleService();

export const getAllRoles = async (req: Request,res:Response) =>{
    const allRoles=await _roleService.getAllRolesAsync();
    (allRoles==null) ? res.json({response: 'No Roles In Data Base'}) : res.status(200).json(allRoles);
}
export const getRoleByRoleName = async (req: Request,res:Response) =>{
    const {rolename} = req.params;
    const role=await _roleService.getRoleByRolenameAsync(rolename);
    (role==null) ? res.json({response: 'Role Not Found'}) : res.status(200).json(role);
}
export const createRole = async (req: Request,res:Response) =>{
    const roleInput=await _roleService.roleParse(req.body);
    const role=await _roleService.createRoleAsync(roleInput);
    (role==null) ? res.json({response: 'Role Could Not Be Created'}) : res.status(200).json(role);
}
export const updateRoleByRoleName = async (req: Request,res:Response) =>{
    const {rolename} = req.params;
    let roleInput=_roleService.roleParse(req.body);
    const role=await _roleService.updateRoleByRolenameAsync(rolename,roleInput);
    (role==null) ? res.json({response: 'Role Could Not Be Updated'}) : res.status(200).json(role);
}
export const deleteRoleByRoleName = async (req: Request,res:Response) =>{
    const {rolename} = req.params;
    const role=await _roleService.deleteRoleByRolenameAsync(rolename);
    (role==null) ? res.json({response: 'Role Not Found'}) : res.status(200).json({response: 'Role Deleted Succesfully'});
}
