import { UserBaseModel } from "data/entities";
export interface UserMySQL{
    //Required For Creation in DB
    username: String,  
    password: String,
    phoneNumber:String,  
    //roles:IRoleDocument['_id'][],
    
    //Required After Creation in DB
    id: String,
    createdOnUtc:Date,
    updatedOnUtc:Date,

    //Optional
    firstName?:String,  
    lastName?:String,  
    email?:String,
    zipPostalCode?:String,
    address1?:String,
    company?:String,
    country?:String,
    stateProvince?:String,
    city?:String,
    address2?:String,
}

export class User{
    public static save(){

    };
    public static findOne(){
        
    } 
}