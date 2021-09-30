import {Request,Response,Router} from "express";
import app from "../server/app";
class IndexRoutes{
    router: Router;
    constructor(){
        this.router=Router();
        this.routes();
    }
    routes(){
        this.router.get('/',(req,res)=>{
            res.json({
                author: app.get('pkg').name,
                description: app.get('pkg').description,
                version: app.get('pkg').version
            });
        });
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;