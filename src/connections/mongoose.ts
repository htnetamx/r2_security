import mongoose from 'mongoose';
import { MongooseConnectionInputParams, MongooseConnectionOptions, MongooseConnectionType,
         ConnectionStatus             , ConnectionType        
} from "../application/base/types";import { Connection} from './connection';

export class MongooseConnection extends Connection{
    public uri: string;

    constructor(input: MongooseConnectionInputParams ,options: MongooseConnectionOptions) {
      super(input,options);
      this.type=ConnectionType.Mongoose;
      this.uri=this.generateMongooseURI(input);
    }

    private generateMongooseURI(input:MongooseConnectionInputParams):string {
        var auth;
        (input.username) ? (input.password) ? auth=input.username+':'+input.password + '@' : auth='' : auth='';
        return 'mongodb://'+auth+input.host+':'+input.port+'/'+input.database;
    }

    public async connect() : Promise<boolean> {
        try{
            this.pool=(await mongoose.connect(this.uri,<MongooseConnectionOptions>this.options)).connection;
            this.uri=this.uri;
            
            Connection.mongoosePool=this.pool;
            this.status=ConnectionStatus.Up;
            return true;
        }catch(error){
            this.pool=null;
            this.uri="";

            Connection.mongoosePool=this.pool;
            this.status=ConnectionStatus.Error;
            return false;
        }
        
    }

    public async disconnect() : Promise<boolean> {
        try{
            if(this.pool!=null){
                await (<MongooseConnectionType>this.pool).close();

                this.pool=null;
                this.uri="";
                
                Connection.mongoosePool=null;
                this.status=ConnectionStatus.Down;
                return true;
            }
            else{
                this.status=ConnectionStatus.Down;
                return false;
            }
            
        }catch(error){
            return false;
        } 
    }

}