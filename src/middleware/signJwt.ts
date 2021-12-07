import jwt from 'jsonwebtoken';
import { UserInputModel } from '../application/domain/user';
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

const signJWT = (user: UserInputModel, callback:(error: Error | null, token: string | null) => void): void => {
    var timeSingEpoch = new Date().getTime();
    var expirationTime = timeSingEpoch + Number(tokenconfig.expiretime) * 100000
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {

        jwt.sign(
            {
                username: user.username
            },
            tokenconfig.secret,
            {
                issuer: tokenconfig.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error){
                    callback(error, null)
                } else{
                    callback(null, typeof(token) );
                }
            }
        )
        
    } catch (error) {
        if (error instanceof Error){
            callback(error, null)
        }
    }
}

export default signJWT