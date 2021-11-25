import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export interface IPayload {
    _id: string;
    iat: number;
} 

export const JwtValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) return next(res.status(401).json("Access Denied"))
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        if (!token) return res.status(401).json('Access Denied');

        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
        req.payload = payload;
        next()
    } catch(e) {
        res.status(400).send('Invalid Token')
    }
    
}
