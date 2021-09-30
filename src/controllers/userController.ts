import {Request,Response} from "express";
import  {IUser} from "../services/User/IUser";

export const getAllUsers = async (req: Request,res:Response) =>{
    const users=await IUser.find();
    res.json(users);
}
export const getUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await IUser.findByUserNameAsync(username);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
}
export const createUser = async (req: Request,res:Response) =>{
    const {username,password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles}=req.body;
    const newUser=new IUser({username,password: password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles})
    console.log(await IUser.getAllUsersAsync(password));
    //console.log(await IUser.findByUserNameAsync(password));
    //console.log(await IUser.createUserAsync(password));
    //console.log(await IUser.comparePasswordAsync(password,"123"));
    //console.log(await IUser.cypherPasswordAsync(password));
    console.log(newUser);
    /*
    IUser.createUserAsync({username,password: password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles});
    console.log(newUser);

    /*
    try{
        const userSaved=await newUser.save();
        res.json(userSaved);
    }
    catch(error){
        res.json({"Error":error});
    }*/
}
export const updateUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    const user=await IUser.findOneAndUpdate({username},req.body,{new: true});
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json(user);
}
export const deleteUserByUserName = async (req: Request,res:Response) =>{
    const {username} = req.params;
    console.log(username);
    const user=await IUser.findOneAndDelete({Username:username});
    console.log(user);
    (user==null) ? res.json({response: 'User Not Found'}) : res.status(200).json({response: 'User Deleted Succesfully'});
}

