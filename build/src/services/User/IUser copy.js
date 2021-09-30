"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("../../repositories/user");
exports.User = (0, mongoose_1.model)('User', user_1.UserSchema);
/*
// method
UserSchema.methods.methodExample = function (): string {
    return "Method Working";
}

// static method
UserSchema.statics.encryptPasswordAsync = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password,salt);
};

UserSchema.statics.checkPasswordAsync = async function (password: string,recievedPassword:string): Promise<boolean> {
    return await bcrypt.compare(password,recievedPassword);
};

UserSchema.statics.getAllUsersAsync = async function (username: string): Promise<Array<IUserDocument>> {
    return await this.find();
};

UserSchema.statics.findByUserNameAsync = async function (username: string): Promise<IUserDocument> {
    return await this.findOne({ username })
};

UserSchema.statics.createUserAsync = async function (user: IUserDocument): Promise<IUserDocument>{
    const {username,password,firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles}=user;
    const newUser=new IUser({username,password: await IUser.cypherPasswordAsync(password),firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles})
    console.log(newUser);
    try{
        return await newUser.save();
    }
    catch{
        return null as any;
    }
    return null as any;
};
*/ 
