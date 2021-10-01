import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";
import config from "../server/config";
import { userService } from "../services/User/userService";
import { roleService } from "../services/Role/roleService";
const _userService=new userService();
const _roleService=new roleService();

export const verifyToken = async(req:Request,res:Response,next:NextFunction) => {
    var token=req.headers["x-access-token"];

    if(!token) return res.status(403).json({Response: "No Token Provided"});
    token=token.toString();
    var id;
    try{
        id=(<any>jwt.verify(token,config.SECRET)).id;
    }catch{
        return res.status(403).json({Response: "Token Not Valid"});
    }

    const user=await _userService.getUserById(id);
    if(!user) return res.status(404).json({Response: "No User Found"});
    req.user=user;
    next();
}
export const isAdmin = async(req:Request,res:Response,next:NextFunction) => {
    const rolesList=await _roleService.getValidIdListFromRoleFieldList(req.user.roles,'_id');
    if (rolesList!=null && rolesList.some(e => e.role === 'admin')) {
        next();
    }
    else{
        return res.status(403).json({Response: "Unauthorized. Admin Role Required"});
    }
}

export default {verifyToken,isAdmin};