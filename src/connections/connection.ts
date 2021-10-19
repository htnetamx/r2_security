import { MongooseConnectionInputParams, MongooseConnectionOptions, MongooseConnectionType,
         MySQL2ConnectionInputParams  , MySQL2ConnectionOptions  , MySQL2ConnectionType  ,
         ConnectionStatus             , ConnectionType        
} from "../application/base/types";

export class Connection{
    public static mongoosePool:     MongooseConnectionType|null=null;
    public static mySQL2Pool:       MySQL2ConnectionType  |null=null;

    public input         :      | MongooseConnectionInputParams  | MySQL2ConnectionInputParams   ;
    public options       :      | MongooseConnectionOptions      | MySQL2ConnectionOptions       ;
    public pool          : null | MongooseConnectionType         | MySQL2ConnectionType          ;  
    public type          : null | ConnectionType                                                 ;
    public status        : null | ConnectionStatus                                               ;

    constructor(input:   MongooseConnectionInputParams | MySQL2ConnectionInputParams ,
                options: MongooseConnectionOptions     | MySQL2ConnectionOptions      
        ){
        this.input=input;
        this.options=options;
        this.pool=null;
        this.type=null;
        this.status=ConnectionStatus.Down;
    }
    public async connect():Promise<boolean>{return false;};
    public async disconnect():Promise<boolean>{return false;};
    public toString = () : string => {
        var connection=`Connection: ${this.type}`;
        const clength=22-connection.length;
        var status=    `Status:     ${this.status}`;
        const slength=22-status.length;
        if(this.type){
            for(let i=0;i<clength;i++){
                connection=connection+" ";
            }
        }
        if(this.status){
            for(let i=0;i<slength;i++){
                status=status+" ";
            }
        }
        var str=`| ${connection} | ${status} |`
        return str;
    }
};