import  {IRoleDocument} from '../../repositories/role';
export interface IRole{
  //Properties
  //Attribute1: type;
  
  //Mehtods
    //Objects
    roleParse(params: any) : any

    //CRUDE
    createRoleAsync(role: IRoleDocument): Promise<IRoleDocument|null>;
    updateRoleByRolenameAsync(rolename: string,roleInfo: IRoleDocument): Promise<IRoleDocument|null>;
    deleteRoleByRolenameAsync(rolename: string): Promise<IRoleDocument|null>;

    //Search
    getAllRolesAsync(): Promise<Array<IRoleDocument>|null>;
    getRoleByRolenameAsync (rolename: string): Promise<IRoleDocument|null>;
    getRoleById (id: String): Promise<IRoleDocument|null>;
    roleExistsByRolenameAsync (rolename: string): Promise<boolean>;
    getValidIdListFromRoleFieldList (roles: any,field: string): Promise<Array<IRoleDocument>|null>;
    getRoleIdByRolenameAsync (role: string): Promise<IRoleDocument|null>;
};