import mySQL2 from 'mySQL2/promise';
import fs from 'fs/promises';
import { MySQL2ConnectionInputParams, MySQL2ConnectionOptions, MySQL2ConnectionType,
        ConnectionStatus            , ConnectionType        
} from "../application/base/types";
import { Connection} from './connection';
export class MySQL2Connection extends Connection {
    constructor(input: MySQL2ConnectionInputParams ,options: MySQL2ConnectionOptions) {
        super(input,options);
        this.type=ConnectionType.MySQL2;
    }

    public async connect() : Promise<boolean> {
        var port_parsed: number;
        var results, fields;
        (!this.input.port) ? port_parsed=3306 : port_parsed=+this.input.port;
        this.input.port;
        try{
            this.pool = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    database: this.input.database,
                    connectionLimit: (<MySQL2ConnectionOptions>this.options).connectionLimit,
                    waitForConnections: (<MySQL2ConnectionOptions>this.options).waitForConnections,
                    queueLimit: (<MySQL2ConnectionOptions>this.options).queueLimit,
                    multipleStatements: true
                });
            [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.input.database]);
            Connection.mySQL2Pool=this.pool;
            this.status=ConnectionStatus.Up;
            return true;
        }catch(error: any){
            try{
                this.pool = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    connectionLimit: (<MySQL2ConnectionOptions>this.options).connectionLimit,
                    waitForConnections: (<MySQL2ConnectionOptions>this.options).waitForConnections,
                    queueLimit: (<MySQL2ConnectionOptions>this.options).queueLimit
                });
                [results, fields] = await this.executeQuery('CREATE DATABASE IF NOT EXISTS ??',[this.input.database]);
                this.pool = await mySQL2.createPool({
                    host: this.input.host,
                    port: port_parsed,
                    user: this.input.username,
                    password: this.input.password,
                    database: this.input.database,
                    connectionLimit: (<MySQL2ConnectionOptions>this.options).connectionLimit,
                    waitForConnections: (<MySQL2ConnectionOptions>this.options).waitForConnections,
                    queueLimit: (<MySQL2ConnectionOptions>this.options).queueLimit
                });
                const initialDataBase=await this.serializeQueries(await this.readSetSQLFile('src/data/db/mySQL/initialDataBase.sql'));
                [results, fields] = await this.executeQuery('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[this.input.database]);
                Connection.mySQL2Pool=this.pool;
                this.status=ConnectionStatus.Up;
                return  true;
            }catch(error2: any){
                this.pool=null;
                Connection.mySQL2Pool=null;
                this.status=ConnectionStatus.Error;
                //console.log(error);
                //console.log(error2);
                return  false;
            }
        }
    }

    public async disconnect() : Promise<boolean> {
        try{
            if(this.pool!=null){
                await (<MySQL2ConnectionType>this.pool).end();

                this.pool=null;
                
                Connection.mySQL2Pool=null;
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

    public async executeQuery(query: string,params?: Array<string>):Promise<any>{
        return (this.pool) ? await (<MySQL2ConnectionType>this.pool).execute(mySQL2.format(query,params)) : null;
    }

    public async serializeQueries(dataArr:Array<string>):Promise<Array<any>>{
        var queries: Array<any> = [];
        if(this.pool){
            for(let i=0;i<dataArr.length;i++){
                try{
                    if (dataArr[i]) queries.push({Success: await this.executeQuery(dataArr[i])});
                }catch(error){
                    queries.push({Error: (<any>error).sqlMessage});
                }
            }
            return queries;
        }else{
            return queries;
        }
    }

    public async readSetSQLFile(uri:string):Promise<Array<string>>{
        const dataArr = ((await fs.readFile(uri)).toString()).toString().replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/g, ' ').trim().split(';');
        return dataArr;
    }

    
}