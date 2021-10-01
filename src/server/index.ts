//TODO: Configuracion de express, cors, morgan, mongoose, graphql
import express from "express";
import app from './app'
import mongoose  from "mongoose";
import db from "./database";
import { createRoles } from "../libs/initialSetup";

import indexRoutes from "../api/index";
import userRoutes from "../api/userRoutes";
import authRoutes from "../api/authRoutes";
import roleRoutes from "../api/roleRoutes";

class Server{
    public app: express.Application;

    constructor(){
        this.app=app;
        this.routes();
    }
 
    routes(){
        this.app.use('/',indexRoutes);
        this.app.use('/auth',authRoutes);
        this.app.use('/users',userRoutes);
        this.app.use('/roles',roleRoutes);
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port: ',this.app.get('port'));
        });
    }
}
const startServer= async() => {
    try{
        const MONGO_URI=await db.mongooseConnect();
        console.log("Running Database in "+MONGO_URI);
        const server=new Server();
        server.start();
    }catch{
        console.log("Error in initial connection to mongoose database");
    }
};

startServer();




