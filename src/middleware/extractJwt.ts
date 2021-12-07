import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || 3600;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER || "Issuer";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

const tokenconfig = {
    expiretime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    secret: TOKEN_SECRET
}

const extraJWT = (req: Request, resp: Response, next: NextFunction) => {

    let token  = req.headers.authorization?.split(' ')[1];

    if(token){

        jwt.verify(token, tokenconfig.secret, (error, decode) => {

            if (error){
                return resp.status(404).json({
                    message: error.message,
                    error
                })
            } else{
                resp.locals.jwt = decode;
                next();
            }
        });
        
    } else{
        return resp.status(401).json({
            message: 'Unauthorized'
        });
    }

}

export default extraJWT; 