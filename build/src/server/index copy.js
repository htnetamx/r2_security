"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("../api/index"));
const userRoutes_1 = __importDefault(require("../api/userRoutes"));
const authRoutes_1 = __importDefault(require("../api/authRoutes"));
const roleRoutes_1 = __importDefault(require("../api/roleRoutes"));
class Server {
    constructor() {
        this.app = app_1.default;
        this.routes();
    }
    routes() {
        this.app.use('/', index_1.default);
        this.app.use('/auth', authRoutes_1.default);
        this.app.use('/users', userRoutes_1.default);
        this.app.use('/roles', roleRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
