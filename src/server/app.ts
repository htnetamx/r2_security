import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import * as pkg from '../../package.json';
import { IUserDocument } from "../repositories/user";

// DataBase
import './database';

//Import Roles
import { createRoles } from "../libs/initialSetup";

// Create App
const app = express();
createRoles();

//Express Custom Interfaces
declare global {
    namespace Express {
      interface Request {
        user: IUserDocument
      }
    }
}

app.set('pkg',pkg);

// Settings
const default_port=3000;
app.set('port',process.env.PORT || default_port);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(compression());
app.use(cors());
console.log("Running app.js");
export default app;