
import { Schema,Document,model} from 'mongoose';
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

// User Schema
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
      unique: true, 
      //required: true,
      sparse: true 
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

// User Model
export default model<IUserDocument>('User', UserSchema);