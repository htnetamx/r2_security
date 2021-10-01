import {Request,Response} from "express";
import  {userService} from "../services/User/userService";
import  {roleService} from "../services/Role/roleService";
import jwt from "jsonwebtoken";
import config from '../server/config'
const _userService = new userService();
const _roleService = new roleService();
export const signUp = async (req: Request,res:Response) =>{
    const {username,password,phoneNumber,roles}=req.body;
    const userInput=await _userService.userParse({username,password,phoneNumber,roles});
    if(userInput==null){
        res.json({response: 'Input Data Could Not Be Parsed'});
    }
    else{
        if(roles){
            userInput.roles=(await _roleService.getValidIdListFromRoleFieldList(roles,'role'))?.map(role=>role._id);
        }
        else{
            userInput.roles=[await _roleService.getRoleIdByRolenameAsync('EndClient')];
        }
        if((await _userService.userExistsByUsernameAsync(username))){
            res.json({response: 'User Already Exists'});
        }
        else{
            const encryptedPassword=await _userService.encryptPasswordAsync(userInput.password);
            if(encryptedPassword==null){
                res.json({response: 'Error Update Password could not be encrypted'})
            }
            else{
                userInput.password=encryptedPassword;
                const user=await _userService.createUserAsync(userInput);
                if(user==null){
                    res.json({response: 'User Could Not Be Created'}) 
                }
                else{
                    const token=jwt.sign({id: user._id},config.SECRET,{
                        expiresIn: 86400 //24 Hours
                    });
                    res.status(200).json({token});
                }
            }
        }
    }
}

export const signIn = async (req: Request,res:Response) =>{
    const {username,password}=req.body;
    var user= await _userService.getUserByUsernameAsync(username);
    if(!user) return res.status(400).json({Response: "User Not Found"});

    const matchPass=await _userService.checkPasswordAsync(password,""+user.password);
    if(!matchPass) return res.status(401).json({token: null,message: 'Invalid Password'});

    var populatedUser= await _userService.populateField(user,'roles');
    if(!populatedUser) return res.status(400).json({Response: "User Field Could Not Be Populated Found"});

    const token=jwt.sign({id: populatedUser._id},config.SECRET,{
        expiresIn: 86400 //24 Hours
    });
    res.status(200).json({token});
}