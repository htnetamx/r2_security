import  Role from '../../repositories/role';
import  {IRoleDocument} from '../../repositories/role';
import {IRole} from './IRole';

export class roleService implements IRole{ 
    //Properties
    //Attribute1: type;
    
    constructor(){
    //Blank
    };

    //Mehtods
        //Deconstructer
        roleParse(params: any) : any{
            const {role}=params;
            return {role};
        }

        //CRUDE
        async createRoleAsync(role: IRoleDocument): Promise<IRoleDocument|null>{
            try{
                return await (new Role(role)).save();
            }
            catch(error){
                console.log("Error Guardando");
                console.log(error);
                return null;
            }
        };
        async updateRoleByRolenameAsync(role: string,roleInfo: any): Promise<IRoleDocument|null>{
            try{
                return await Role.findOneAndUpdate({role},roleInfo,{new: true});
            }
            catch(error){
                console.log("Error Updating Role");
                //console.log(error);
                return null;
            }
        };
        async deleteRoleByRolenameAsync(role: string): Promise<IRoleDocument|null>{
            try{
                return await Role.findOneAndDelete({role});
            }
            catch(error){
                console.log("Error Deleting Role");
                //console.log(error);
                return null;
            }
        };

        //Search Methods
        async getAllRolesAsync(): Promise<Array<IRoleDocument>|null> {
            try{
                const rolesList=await Role.find();
                if(rolesList.length==0 || rolesList==null || rolesList==undefined){
                    return null;
                }
                else{
                    return rolesList;
                }
            }
            catch(error){
                console.log("Error in finding All Roles");
                //console.log(error);
                return null;
            }
        };
        async getRoleByRolenameAsync (role: string): Promise<IRoleDocument|null> {
            try{
                return await Role.findOne({ role});
            }
            catch(error){
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        };
        async getRoleById (id: String): Promise<IRoleDocument|null> {
            try{
                return await Role.findById(id);
            }
            catch(error){
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        };
        async roleExistsByRolenameAsync (role: string): Promise<boolean> {
            try{
                return ((await Role.findOne({ role }))!=null);
            }
            catch(error){
                console.log("Error in finding Role");
                //console.log(error);
                return false;
            }
        };
        async getValidIdListFromRoleFieldList (roles: any,field: string): Promise<Array<IRoleDocument>|null>{
            try{
                let object: any = {param: {$in: roles}};
                object[field]=object.param;
                delete object.param;
                const rolesList=await Role.find(object);
                if(rolesList.length==0 || rolesList==null || rolesList==undefined){
                    return null;
                }
                else{
                    return rolesList;
                }
            }
            catch(error){
                console.log("Error in finding valid Roles");
                //console.log(error);
                return null;
            }
        }
        async getRoleIdByRolenameAsync (role: string): Promise<IRoleDocument|null> {
            try{
                const foundRole=await Role.findOne({role});
                return (foundRole==null) ? null : foundRole._id;
            }
            catch(error){
                console.log("Error in finding Role");
                //console.log(error);
                return null;
            }
        };
}