import { UserInputModel} from "../../application/domain";

export interface UserBaseModel{
    //Required For Creation in DB
    username: string,  
    password: string,
    phoneNumber:string,  
    //roles:IRoleDocument['_id'][],
    
    //Required After Creation in DB
    id: string,
    createdOnUtc:Date,
    updatedOnUtc:Date,

    //Optional
    firstName?:string,  
    lastName?:string,  
    email?:string,
    zipPostalCode?:string,
    address1?:string,
    company?:string,
    country?:string,
    stateProvince?:string,
    city?:string,
    address2?:string,
}

export class User implements UserBaseModel{
    public username: string;
    public password: string;
    public phoneNumber:string;

    public id: string;
    public createdOnUtc:Date;
    public updatedOnUtc:Date;

    public firstName?:string; 
    public lastName?:string; 
    public email?:string;
    public zipPostalCode?:string;
    public address1?:string;
    public company?:string;
    public country?:string;
    public stateProvince?:string;
    public city?:string;
    public address2?:string;

    constructor(data?: UserInputModel){
        if(!data) data={};
        (data.username)      ? this.username= data.username            : this.username = 'default'; 
        (data.password)      ? this.password= data.password            : this.password = 'default'; 
        (data.phoneNumber)   ? this.phoneNumber= data.phoneNumber      : this.phoneNumber = 'default'; 
        
        (data.id)            ? this.id= data.id                        : this.id = 'default'; 
        this.createdOnUtc=new Date();
        this.updatedOnUtc=new Date();

        (data.firstName)     ? this.firstName= data.firstName          : this.firstName = undefined; 
        (data.lastName)      ? this.lastName= data.lastName            : this.lastName  = undefined; 
        (data.email)         ? this.email= data.email                  : this.email = undefined; 
        (data.zipPostalCode) ? this.zipPostalCode = data.zipPostalCode : this.zipPostalCode = undefined; 
        (data.address1)      ? this.address1 = data.address1           : this.address1 = undefined; 
        (data.company)       ? this.company= data.company              : this.company = undefined; 
        (data.country)       ? this.country= data.country              : this.country = undefined; 
        (data.stateProvince) ? this.stateProvince= data.stateProvince  : this.stateProvince = undefined; 
        (data.city)          ? this.city= data.city                    : this.city = undefined; 
        (data.address2)      ? this.address2= data.address2            : this.address2 = undefined; 
    }
}
