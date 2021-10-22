import { ConnectionType,ConnectionStatus } from './application/base/types/connection';
import App from './app';
import { DataBaseConnections} from './connections'
import e from 'express';
import * as dotenv from "dotenv";
dotenv.config();

const setMongoose = {
    input: {
        username: process.env.DATABASE_MONGODB_USER || '',
        password: process.env.DATABASE_MONGODB_PASSWORD || '',
        host: process.env.DATABASE_MONGODB_HOST|| 'localhostes',
        port: process.env.DATABASE_MONGODB_PORT || 27017,
        database: process.env.DATABASE_MONGODB_NAME || 'r2_security'
    },
    options: {
        serverSelectionTimeoutMS: 5000
    }
};
const setMySQL2 = {
    input: {
        username: process.env.DATABASE_MYSQL_USER || 'root',
        password: process.env.DATABASE_MYSQL_PASSWORD || 'Andresposada015!',
        host: process.env.DATABASE_MYSQL_HOST|| 'localhost',
        port: process.env.DATABASE_MYSQL_PORT || 3306,
        database: process.env.DATABASE_MYSQL_NAME || 'r2_security'
    },
    options: {
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0
    }
};

export const AppConnections=new DataBaseConnections();

async function appStart():Promise<string> {
    
    const app= new App(3000);
    const AppConnections=new DataBaseConnections();
    AppConnections.addConnection(ConnectionType.Mongoose,setMongoose.input,setMongoose.options);
    AppConnections.addConnection(ConnectionType.MySQL2,setMySQL2.input,setMySQL2.options);
    
    var connectionSummary=await AppConnections.connectDataBases();
    
    console.log('Summary');
    console.log(connectionSummary.toString().replace(',','\n')+"\n\n");
    
    var succeses=connectionSummary.filter(c=>c.status===ConnectionStatus.Up);
    if(succeses.length>0 /*&& succeses.length==connectionSummary.length*/){
        console.log("Starting App\n\n");
        return await app.start();
    }else {
        console.log("App couldn't start App");
        connectionSummary=await AppConnections.disconnectDataBases();
        console.log("Finished disconnecting\n\n");
        return connectionSummary.filter(c=>c.status!==ConnectionStatus.Up).toString().replace(',','\n')+"\n\n";
    }
}
appStart().then((val) => console.log(val));