import { Request,Response,NextFunction } from "express";
import Role from "../repositories/role";
import User from "../repositories/user";

// Default Validators
export const checkInput = async(req:Request,res:Response,next:NextFunction) => {
    const userKeys=Object.keys(User.schema.paths).filter(k=>k!='_id');
    const errorKeys=(Object.keys(req.body)).filter(k=>!userKeys.includes(k));
    if(errorKeys!=null && errorKeys.length>0) {
        return res.status(403).json(
        {Response: 
            {
            Error: `Input parameters not valid`,
            Field: `Fields ${errorKeys} do not exist`,
            Schema: `User`
            }
        });
    }
    const {username,password,phoneNumber}=req.body;
    if(username==null || username=='' || username==undefined){
        return res.status(403).json(
            {Response: 
                {
                Error: `Error: Empty/Null/Undefined`,
                Field: `username`,
                Schema: `User`
                }
            });
    }
    if(password==null || password==''){
        return res.status(403).json(
            {Response: 
                {
                Error: `Error: Empty/Null/Undefined`,
                Field: `password`,
                Schema: `User`
                }
            });
    }
    if(phoneNumber==null || phoneNumber==''){
        return res.status(403).json(
            {Response: 
                {
                Error: `Error: Empty/Null/Undefined`,
                Field: `phoneNumber`,
                Schema: `User`
                }
            });
    }
    next();
}

export const checkValidRelations = async(req:Request,res:Response,next:NextFunction) => {
    const {roles}=req.body;
    if(roles){
        const dataBaseRoles=(await Role.find()).map(r=>r.role);
        const errorRoles=(<Array<string>>roles).filter(r=>!dataBaseRoles.includes(r));
        if(errorRoles!=null && errorRoles.length>0){
            return res.status(403).json(
                {Response: 
                    {
                    Error: `Roles ${errorRoles} do not exist`,
                    Field: `roles`,
                    Schema: `User`
                    }
                });
        }
    }
    next();
}

export const checkDuplicates = async(req:Request,res:Response,next:NextFunction) => {
    const {username,phoneNumber,email}=req.body;
    if(username){
        var user = await User.find({username});
        if(user){
            return res.status(403).json(
                {Response: 
                    {
                    Error: `Duplicated Field`,
                    Field: `username`,
                    Schema: `User`
                    }
                });
        }
    }
    if(phoneNumber){
        user = await User.find({phoneNumber});
        if(user){
            return res.status(403).json(
                {Response: 
                    {
                    Error: `Duplicated Field`,
                    Field: `phoneNumber`,
                    Schema: `User`
                    }
                });
        }
    }
    if(email){
        user = await User.find({email});
        if(user){
            return res.status(403).json(
                {Response: 
                    {
                    Error: `Duplicated Field`,
                    Field: `email`,
                    Schema: `User`
                    }
                });
        }
    }
    next();
}

// Extra Validations
export const checkInputPassword = async(req:Request,res:Response,next:NextFunction) => {
    const userKeys=['password'];
    const errorKeys=(Object.keys(req.body)).filter(k=>!userKeys.includes(k));
    if(errorKeys!=null && errorKeys.length>0) {
        return res.status(403).json(
        {Response: 
            {
            Error: `Input parameters not valid`,
            Field: `Fields ${errorKeys} not valid to set password`,
            Schema: `User`
            }
        });
    }
    const {password}=req.body;
    if(password==null || password==''){
        return res.status(403).json(
            {Response: 
                {
                Error: `Error: Empty/Null/Undefined`,
                Field: `password`,
                Schema: `User`
                }
            });
    }
    next();
}



export default {checkInput,checkValidRelations,checkDuplicates,checkInputPassword};