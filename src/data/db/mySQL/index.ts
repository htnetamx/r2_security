import { IUserRepository } from "../../../application/contracts";
import { Credential } from "../../../application/domain/credential";
import { UserBaseModel } from "data/entities";
import { UserMapperMySQL } from "./mappers";
import { Connection } from "../../../connections/connection";

export class RepositoryMySQL implements IUserRepository  {
    private userMapper: UserMapperMySQL;
    constructor() {
        this.userMapper = new UserMapperMySQL();
    }

    async addNewUser(user: UserBaseModel): Promise<string|null> {
        if(Connection.mySQL2Pool==null) return null;
        console.log("hey voya1");
        
        //const connected=await this.connection.connectMySQL2();
        //console.log(connected);
        console.log("hey voya2");
        //if(!connected) return null;
        console.log("hey voya3");
        var keys=Object.keys(user);
        var objectArray=[user];
        console.log("hey voya4");
        var valuesQuery: Array<any> = ['User',keys.join(',')];
        let values = objectArray.map( obj => keys.map( key => (<any>obj)[key]));
        valuesQuery.push(values);
        console.log("hey voya5");
        let sql = 'INSERT INTO ? ( ? ) VALUES ?';
        if(values==null || values.length==0) return null;
        console.log("hey voya6");
        console.log(await Connection.mySQL2Pool.query(sql, [valuesQuery]));
        return null;
        
        /*try{
            return 'yes papi';
        } catch(error){
            //console.log(error);
            return null;
        }*/
    }

    async authenticateUser(details: Credential): Promise<string|null> {
        try{
            return 'yes papi';
        } catch(error){
            //console.log(error);
            return null;
        }
    }
}