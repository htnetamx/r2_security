import { Express, Request, Response, NextFunction } from 'express';
import { UserController } from '../../../controller/user';
import signJWT from '../../../middleware/signJwt';
import { UserInputModel } from '../../../application/domain/user';



export class LoginRoute {
    private server: Express;

    constructor(server: Express) {
        this.server = server;
    }

    public authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await new UserController().authenticateUser(req.body);
            if (result) {
                signJWT(result[0], (_error, token) => {
                    if (_error) {
                        return res.status(401).json({
                            message: 'Unable to Sign JWT',
                            error: _error
                        });
                    } else if (token) {
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token,
                            user: result[0]
                        });
                    }
                });
            }

        } catch (e) {

        }
    };

    public configureEndPoints(baseUrl: string) {
        /**
         * @swagger
         * components:
         *  schemas:
         *    Credential:
         *      type: object
         *      properties:
         *        identifier:
         *          type: string
         *          description: The name registered by the user
         *        password:
         *          type: string
         *          description: The user's secret code
         *      required:
         *        - identifier
         *        - password
         *      example:
         *        identifier: carlitos
         *        password: bm3?'_m]y}s}2Wn3
         */

        /**
         * @swagger
         * tags:
         *  name: Authentication
         *  description: Authentication endpoint
         */

        /**
         * @swagger
         * /login:
         *  post:
         *    summary: login in system
         *    tags: [Authentication]
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            $ref: '#/components/schemas/Credential'
         *    responses:
         *      200:
         *        description: The credentials have been authenticated
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/Credential'
         *      500:
         *        description: Some server error
         *
         */
        this.server.post(`${baseUrl}login/`, this.authenticateUser);
    }
}