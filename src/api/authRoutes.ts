import {Router} from "express";
import * as authCtrl from '../controllers/authController';

class AuthRoutes{
    router: Router;
    constructor(){
        this.router=Router();
        this.routes();
    }
    routes(){
        this.router.post('/signup',authCtrl.signUp);
        this.router.post('/signin',authCtrl.signIn);
    }
}

const authRoutes=new AuthRoutes();
export default authRoutes.router;