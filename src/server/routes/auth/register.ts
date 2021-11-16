import { Express, Request, Response, NextFunction } from 'express';
import { UserController } from '../../../controller/user';

export class RegisterRoute {
    private server: Express;

    constructor(server: Express) {
        this.server = server;
    }

    public addNewUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Add New User called');
            //const result = await new UserController().registerUser(req.body);
            const result = "";
            res.send(result);
        } catch (e) {

        }
    };

    public configureEndPoints(baseUrl: string) {
        /**
         * @swagger
         * components:
         *  schemas:
         *    User:
         *      type: object
         *      properties:
         *        username:
         *          type: string
         *          description: The name registered by the user
         *        password:
         *          type: string
         *          description: The user's secret code
         *        phoneNumber:
         *          type: string
         *          description: The user's phone number
         *        firstName:
         *          type: string
         *          description: The user's first name
         *        lastname:
         *          type: string
         *          description: The user's last name
         *        email:
         *          type: string
         *          description: The user email
         *        zipPostalCode:
         *          type: string
         *          description: User zip code
         *        address1:
         *          type: string
         *          description: User address
         *        company:
         *          type: string
         *          description: User company
         *        country:
         *          type: string
         *          description: User country
         *        stateProvince:
         *          type: string
         *          description: User state
         *        city:
         *          type: string
         *          description: User city
         *        address2:
         *          type: string
         *          description: Second user address
         *      required:
         *        - username
         *        - password
         *        - phoneNumber
         *      example:
         *        username: carlitos
         *        password: bm3?'_m]y}s}2Wn3
         *        phoneNumber: 5551576535
         */

        /**
         * @swagger
         * tags:
         *  name: Authentication
         *  description: Authentication endpoint
         */

        /**
         * @swagger
         * /register:
         *  post:
         *    summary: create a new user
         *    tags: [Authentication]
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            $ref: '#/components/schemas/User'
         *    responses:
         *      200:
         *        description: User has been created
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/User'
         *      500:
         *        description: Some server error
         *
         */
        this.server.post(`${baseUrl}register/`, this.addNewUser);
    }
}