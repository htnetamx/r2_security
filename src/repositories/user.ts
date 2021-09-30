
import { Schema,Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import {IRoleDocument} from './role';

// User Document
export interface IUserDocument extends Document {
    //Properties
    username: String,  
    password: String,
    phoneNumber:String,  
    firstName:String,  
    lastName:String,  
    email:String,
    zipPostalCode:String,
    address1:String,
    company:String,
    country:String,
    stateProvince:String,
    city:String,
    address2:String,
    createdOnUtc:Date,
    updatedOnUtc:Date,
    roles:IRoleDocument['_id'][]
  };


// User schema
export const UserSchema: Schema = new Schema({
  username:{
      type: String,  
      required: true, 
      unique: true, 
      lowercase: true
  },
  password:{
      type: String,  
      required: true
  },
  phoneNumber:{
      type: String,
      unique: true,  
      required: true
  },
  firstName:{
      type: String,  
      //required: true
  },
  lastName:{
      type: String,  
      //required: true
  },
  email:{
      type: String,
      unique: true  
      //required: true, 
  },
  zipPostalCode:{
      type: String,  
      //required: true
  },
  address1:{
      type: String,  
      //required: true
  },
  company:{
      type: String
  },
  country:{
      type: String
  },
  stateProvince:{
      type: String
  },
  city:{
      type: String
  },
  address2:{
      type: String
  },
  createdOnUtc:{
      type: Date,  
      required: true,
      default: Date.now()
  },
  updatedOnUtc:{
      type: Date,  
      required: true ,
      default: Date.now()
  },
  roles: [{
      ref: "Role",
      type: Schema.Types.ObjectId
  }]
},{
  //timestamps: true,
  versionKey: false
});


// method
UserSchema.methods.methodExample = function (): string {
    return "Method Working";
}

// static method
UserSchema.statics.cypherPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password,salt);
};

UserSchema.statics.comparePassword = async function (password: string,recievedPassword:string): Promise<boolean> {
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
    /*const newUser=new IUser({username,password: await IUser.cypherPasswordAsync(password),firstName,lastName,email,zipPostalCode,address1,phoneNumber,company,country,stateProvince,city,address2,createdOnUtc,updatedOnUtc,roles})
    console.log(newUser);
    try{
        return await newUser.save();
    }
    catch{
        return null as any;
    }*/
    return null as any;
};