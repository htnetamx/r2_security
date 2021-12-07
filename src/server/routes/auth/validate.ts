import { Express, Request, Response, NextFunction } from 'express';
import extraJWT from '../../../middleware/extractJwt';


export class ValidateRoute {
    private server: Express;

    constructor(server: Express) {
        this.server = server;
    }

    public validate = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            message: 'Token(s) validated'
        });
    };

    public configureEndPoints(baseUrl: string) {
        this.server.post(`${baseUrl}validate/`, extraJWT,this.validate);
    }
}