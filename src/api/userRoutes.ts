import {Router} from "express";
import * as userCtrl from '../controllers/userController';

class UserRoutes{
    router: Router;
    constructor(){
        this.router=Router();
        this.routes();
    }
    routes(){
        this.router.get('/',userCtrl.getAllUsers);
        this.router.get('/:username',userCtrl.getUserByUserName);
        this.router.post('/create',userCtrl.createUser);
        this.router.put('/:username',userCtrl.updateUserByUserName);
        this.router.delete('/:username',userCtrl.deleteUserByUserName);
    }
}

const userRoutes=new UserRoutes();
export default userRoutes.router;