import { Express } from 'express';
import { RegisterRoute } from './auth/register';
import { LoginRoute } from './auth/login';
import { IndexRoute } from './index/welcome';
import { ValidateRoute } from './auth/validate';

export class Routes {
    private server: Express;
    private baseUrl: string = '/api/v1/';
    private indexRoute: IndexRoute;
    private registerRoute: RegisterRoute;
    private loginRoute: LoginRoute;
    private validate: ValidateRoute;

    constructor(server: Express) {
        this.server = server;
        this.registerRoute = new RegisterRoute(server);
        this.loginRoute = new LoginRoute(server);
        this.indexRoute = new IndexRoute(server);
        this.validate = new ValidateRoute(server);
        this.configureApiEndPoints(this.baseUrl);
    }

    public configureApiEndPoints(baseUrl: string) {
      this.indexRoute.configureEndPoints(baseUrl);
      this.registerRoute.configureEndPoints(baseUrl);
      this.loginRoute.configureEndPoints(baseUrl);
      this.validate.configureEndPoints(baseUrl);
    }
}