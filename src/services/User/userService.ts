import  User from '../../repositories/user';
import  {IUserDocument} from '../../repositories/user';
import {IUser} from './IUser';
import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';

export class userService implements IUser{ 
    //Properties
    //Attribute1: type;
    
    constructor(){
    //Blank
    };

    //Mehtods
        //Deconstructer
        userParse(params: any) : any{
            const {username,password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles}=params;
            return {username,password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles};
        }

        //CRUDE
        async createUserAsync(user: IUserDocument): Promise<IUserDocument|null>{
            try{
                return await (new User(user)).save();
            }
            catch(error){
                console.log("Error Guardando");
                console.log(error);
                return null;
            }
        };
        async updateUserByUsernameAsync(username: string,userInfo: any): Promise<IUserDocument|null>{
            try{
                return await User.findOneAndUpdate({username},userInfo,{new: true});
            }
            catch(error){
                console.log("Error Updating User");
                //console.log(error);
                return null;
            }
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

        //Password Management
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
        //Search Methods
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
        async getUserByUsernameAsync (username: string): Promise<IUserDocument|null> {
            try{
                return await User.findOne({ username });
            }
            catch(error){
                console.log("Error in finding User");
                //console.log(error);
                return null;
            }
        };
        async getUserById (id: String): Promise<IUserDocument|null> {
            try{
                const userid=id;
                return await User.findById(userid);
            }
            catch(error){
                console.log("Error in finding User");
                //console.log(error);
                return null;
            }
        };
        async userExistsByUsernameAsync (username: string): Promise<boolean> {
            try{
                return ((await User.findOne({ username }))!=null);
            }
            catch(error){
                console.log("Error in finding User");
                //console.log(error);
                return false;
            }
        };

        //Populate Field
        async populateField (user: IUserDocument,field: string): Promise<IUserDocument|null> {
            try{
                return await (new User(user)).populate(field);
            }
            catch(error){
                console.log("Error in Populating User Roles");
                //console.log(error);
                return null;
            }
        }
}