import { Express, Request, Response, NextFunction } from 'express';

export class IndexRoute {
    private server: Express;

    constructor(server: Express) {
        this.server = server;
    }

    public welcomeMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = "Esta funcionando el mani";
            res.send(result);
        } catch (e) {
            console.log(e);
        }
    };

    public configureEndPoints(baseUrl: string) {
        /**
         * @swagger
         * /:
         *  get:
         *    summary: Welcome message
         *    responses:
         *      200:
         *        description: Return a welcome message
         *        content:
         *          text/html:
         *               schema:
         *                  type: string
         *                  example: Esta funcionando el mani
         */

        this.server.get(``, this.welcomeMessage);
        this.server.get(`${baseUrl}`, this.welcomeMessage);
    }
}