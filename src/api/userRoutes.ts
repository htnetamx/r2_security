import {Router} from "express";
import * as userCtrl from '../controllers/userController';
import {authJWT,userVerification} from "../middlewares";
class UserRoutes{
    router: Router;
    constructor(){
        this.router=Router();
        this.routes();
    }
    routes(){
        this.router.get('/',[
            authJWT.verifyToken,
            authJWT.isAdmin
        ],userCtrl.getAllUsers);

        this.router.get('/:username',[
            authJWT.verifyToken,
            authJWT.isAdmin
        ], userCtrl.getUserByUserName);

        this.router.post('/create',[
            authJWT.verifyToken,
            authJWT.isAdmin,
            userVerification.checkInput,
            userVerification.checkDuplicates,
            userVerification.checkValidRelations
        ],userCtrl.createUser);

        this.router.put('/:username/password', [
            authJWT.verifyToken,
            authJWT.isAdmin,
            userVerification.checkInputPassword
        ],userCtrl.updateUserPasswordByUserName);

        this.router.put('/:username',[
            authJWT.verifyToken,
            authJWT.isAdmin,
            userVerification.checkInput,
            userVerification.checkDuplicates,
            userVerification.checkValidRelations
        ], userCtrl.updateUserByUserName);

        this.router.delete('/:username',[
            authJWT.verifyToken,
            authJWT.isAdmin
        ], userCtrl.deleteUserByUserName);
    }
}

const userRoutes=new UserRoutes();
export default userRoutes.router;