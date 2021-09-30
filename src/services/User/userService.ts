import { Model, model } from 'mongoose';
import  User from '../../repositories/user';
import  {IUserDocument} from '../../repositories/user';
import {IUser} from './IUser';
import bcrypt from 'bcryptjs';

export class userService implements IUser{ 
    //Properties
    //Attribute1: type;
    
    constructor(){
    //Blank
    };

    //Mehtods
        //UserObjects
        newUser(params: any) : IUserDocument|null{
            const {username,password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles}=params;
            //Validadores
            if(username==null || username==''){
                console.log("Error en Campo Username De Modelo User");
                return null;
            }
            if(password==null || password==''){
                console.log("Error en Campo Password De Modelo User");
                return null;
            }
            if(phoneNumber==null || phoneNumber==''){
                console.log("Error en Campo phoneNumber De Modelo User");
                return null;
            }
            const newUser=new User({username,password: password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles})
            return newUser;
        }

        //CRUDE
        async getAllUsersAsync(): Promise<Array<IUserDocument>|null> {
            try{
                const usersList=await User.find();
                if(usersList.length==0 || usersList==null){
                    return null;
                }
                else{
                    return usersList;
                }
            }
            catch(error){
                console.log("Error in finding All Users");
                //console.log(error);
                return null;
            }
        };
        async getUserByNameAsync (username: string): Promise<IUserDocument|null> {
            try{
                return await User.findOne({ username });
            }
            catch(error){
                console.log("Error in finding User");
                //console.log(error);
                return null;
            }
        };
        async createUserAsync(user: IUserDocument): Promise<IUserDocument|null>{
            try{
                return await user.save();
            }
            catch(error){
                console.log("Error Guardando");
                //console.log(error);
                return null;
            }
        };
        async updateUserByUsernameAsync(username: String,userInfo: IUserDocument): Promise<IUserDocument|null>{
            try{
                return await User.findOneAndUpdate({username},userInfo,{new: true});
            }
            catch(error){
                console.log("Error Updating User");
                //console.log(error);
                return null;
            }
        };
        async updateUserPasswordByUsernameAsync(user: IUserDocument,newPassword: string): Promise<IUserDocument|null>{
            if(user==null){
                console.log("Usuario No Existe");
                return null;
            }
            const password=await this.encryptPasswordAsync(newPassword);
            if(password==null || password==''){
                console.log("Clave No Valida");
                return null;
            }
            user.password=password;
            return await User.findOneAndUpdate({username:user.username},user,{new: true});
        };
        async deleteUserByUsernameAsync(username: string): Promise<IUserDocument|null>{
            try{
                return await User.findOneAndDelete({username});
            }
            catch(error){
                console.log("Error Deleting User");
                //console.log(error);
                return null;
            }
        };


        //Verification
        async encryptPasswordAsync(password: string): Promise<string|null> {
            try{
                const salt = await bcrypt.genSalt(15);
                return await bcrypt.hash(password,salt);
            }
            catch(error){
                console.log("Error Encrypting Password");
                //console.log(error);
                return null;
            }
        };
        async checkPasswordAsync(password: string,recievedPassword:string): Promise<boolean|null> {
            try{
                return await bcrypt.compare(password,recievedPassword);
            }
            catch(error){
                console.log("Error Comparing Passwords");
                console.log(error);
                return null;
            }
        };
}