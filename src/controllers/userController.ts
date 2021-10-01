import {Request,Response} from "express";
import  {userService} from "../services/User/userService";

const _userService = new userService();

export const getAllUsers = async (req: Request,res:Response) =>{
    const allUsers=await _userService.getAllUsersAsync();
    (allUsers==null) ? res.json({response: 'No Users In Data Base'}) : res.status(200).json(allUsers);
}
export const getUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await _userService.getUserByUsernameAsync(username);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
}
export const createUser = async (req: Request,res:Response) =>{
    const userInput=await _userService.userParse(req.body);
    const encryptedPassword=await _userService.encryptPasswordAsync(userInput.password);
    if(encryptedPassword==null){
        res.json({response: 'Error Update Password could not be encrypted'})
    }
    else{
        userInput.password=encryptedPassword;
        const user=await _userService.createUserAsync(userInput);
        (user==null) ? res.json({response: 'User Could Not Be Created'}) : res.status(200).json(user);
    }
}
export const updateUserPasswordByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    let userInput=_userService.userParse(req.body);
    const encryptedPassword=await _userService.encryptPasswordAsync(userInput.password);
    (encryptedPassword==null) ? res.json({response: 'Error Update Password could not be encrypted'}) : userInput.password=encryptedPassword;
    userInput.updatedOnUtc=Date.now();
    const user=await _userService.updateUserByUsernameAsync(username,userInput);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
}
export const updateUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    let userInput=_userService.userParse(req.body);
    delete userInput['password'];
    userInput.updatedOnUtc=Date.now();
    const user=await _userService.updateUserByUsernameAsync(username,userInput);
    (user==null) ? res.json({response: 'User Could Not Be Updated'}) : res.status(200).json(user);
}
export const deleteUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await _userService.deleteUserByUsernameAsync(username);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json({response: 'User Deleted Succesfully'});
}
