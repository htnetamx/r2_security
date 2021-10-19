import { IUserRepository } from "../../../application/contracts";
import { Credential } from "../../../application/domain";
import { UserBaseModel} from "../../entities";
import { User,UserMongoDB, UserMongoDBUniqueModel,UserMongoDBFilterModel } from './models';
import { UserMapperMongoDB } from "./mappers";
import { keys } from "ts-transformer-keys";

export class RepositoryMongoDB implements IUserRepository  {
    private static instance: RepositoryMongoDB = new RepositoryMongoDB();
    private userMapper: UserMapperMongoDB;
    
    constructor() {
        this.userMapper = new UserMapperMongoDB();
    }

    async addNewUser(params: UserBaseModel|null): Promise<string|null> {
        try{
            if(params==null || params==undefined) return null;
            const infoMongoDB = this.userMapper.mapTo(params);
            const result = await (new User(infoMongoDB)).save();
            const infoBase = this.userMapper.mapFrom(result);
            return (infoBase==null || infoBase==undefined || infoBase.id==null || infoBase.id==undefined || infoBase.id=='') ? null : infoBase.id; 
        }catch(error){
            //console.log(error);
            return null;
        }
    }

    
    async findUsersUniqueModel(identifier: string):Promise<Array<string>>{
        try{
            var auth_Array:Array<UserMongoDBUniqueModel>=[];
            const unique_keys = keys<UserMongoDBUniqueModel>();
            const keySet = (key: string,value:any) => {
                const object:any={};
                object[key]=value;
                return object;
            }
            unique_keys.forEach(key=>auth_Array.push(<UserMongoDBUniqueModel>keySet(key,identifier)));
            return (await User.find().or(auth_Array)).map(user=>user.id);
        } catch(error){
            //console.log(error);
            return [];
        }
    }


    async authenticateUser(params: Credential): Promise<string|null> {
        try{
            if(params==null || params==undefined || params.identifier==null || params.identifier==undefined || params.password==null || params.password==undefined) return null;
            const ids=await this.findUsersUniqueModel(params.identifier.toString());
            return (ids.length<1 || ids.length>1) ? null : ids[0];
        }catch(error){
            return null;
        }
    }
}