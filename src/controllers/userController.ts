import {Request,Response} from "express";
import  {userService} from "../services/User/userService";

const _userService = new userService();

export const getAllUsers = async (req: Request,res:Response) =>{
    const allUsers=await _userService.getAllUsersAsync();
    (allUsers==null) ? res.json({response: 'No Users In Data Base'}) : res.status(200).json(allUsers);
}
export const getUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await _userService.getUserByNameAsync(username);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
}
export const createUser = async (req: Request,res:Response) =>{
    const userInput=await _userService.newUser(req.body);
    
    if(userInput==null){
        res.json({response: 'Input Data Could Not Be Parsed'});
    }
    else{
        const {password} = req.body;
        const encryptedPassword=await _userService.encryptPasswordAsync(password);
        if(encryptedPassword==null){
            res.json({response: 'Error Update Password could not be encrypted'})
        }
        else{
            userInput.password=encryptedPassword;
            const user=await _userService.createUserAsync(userInput);
            (user==null) ? res.json({response: 'User Could Not Be Created'}) : res.status(201).json(user);
        }
    }
}
export const updateUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const {password} = req.body;
    let userInput=_userService.newUser(req.body);
    
    if(userInput==null){
        res.json({response: 'Input Data Could Not Be Parsed'});
    }
    else{
        const isAdmin=true;
        if(isAdmin){
            const encryptedPassword=await _userService.encryptPasswordAsync(password);
            (encryptedPassword==null) ? res.json({response: 'Error Update Password could not be encrypted'}) : userInput.password=encryptedPassword;
        }
        else{
            delete userInput['password'];
        }
        const user=await _userService.updateUserByUsernameAsync(username,userInput);
        (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
    }
}

export const deleteUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await _userService.deleteUserByUsernameAsync(username);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json({response: 'User Deleted Succesfully'});
}
