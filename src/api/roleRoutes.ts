import {Router} from "express";
import * as roleCtrl from '../controllers/roleController';
import {authJWT,roleVerification} from "../middlewares";
class RoleRoutes{
    router: Router;
    constructor(){
        this.router=Router();
        this.routes();
    }
    routes(){
        this.router.get('/',[
            authJWT.verifyToken,
            authJWT.isAdmin,
        ],roleCtrl.getAllRoles);

        this.router.get('/:rolename',[
            authJWT.verifyToken,
            authJWT.isAdmin
        ],roleCtrl.getRoleByRoleName);

        this.router.post('/create',[
            authJWT.verifyToken,
            authJWT.isAdmin,
            roleVerification.checkInput,
            roleVerification.checkDuplicates,
            roleVerification.checkValidRelations
        ],roleCtrl.createRole);

        this.router.put('/:rolename',[
            authJWT.verifyToken,
            authJWT.isAdmin,
            roleVerification.checkInput,
            roleVerification.checkDuplicates,
            roleVerification.checkValidRelations
        ],roleCtrl.updateRoleByRoleName);

        this.router.delete('/:rolename',[
            authJWT.verifyToken,
            authJWT.isAdmin
        ],roleCtrl.deleteRoleByRoleName);
    }
}

const roleRoutes=new RoleRoutes();
export default roleRoutes.router;