import { Request,Response,NextFunction } from "express";
import Role from "../repositories/role";


// Default Validators
export const checkInput = async(req:Request,res:Response,next:NextFunction) => {
    const roleKeys=Object.keys(Role.schema.paths).filter(k=>k!='_id');
    const errorKeys=(Object.keys(req.body)).filter(k=>!roleKeys.includes(k));
    if(errorKeys!=null && errorKeys.length>0) {
        return res.status(403).json(
        {Response: 
            {
            Error: `Input parameters not valid`,
            Field: `Fields ${errorKeys} do not exist`,
            Schema: `Role`
            }
        });
    }
    const {role}=req.body;
    if(role==null || role=='' || role==undefined){
        return res.status(403).json(
            {Response: 
                {
                Error: `Error: Empty/Null/Undefined`,
                Field: `role`,
                Schema: `Role`
                }
            });
    }
    next();
}

export const checkValidRelations = async(req:Request,res:Response,next:NextFunction) => {
    // Does not have other schemas in its model
    next();
}

export const checkDuplicates = async(req:Request,res:Response,next:NextFunction) => {
    const {role}=req.body;
    var user = await Role.find({role});
    if(role){
        if(user){
            return res.status(403).json(
                {Response: 
                    {
                    Error: `Duplicated Field`,
                    Field: `role`,
                    Schema: `Role`
                    }
                });
        }
    }
    next();
}

export default {checkInput,checkValidRelations,checkDuplicates};