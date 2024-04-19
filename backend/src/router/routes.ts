import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

class Router {
  private static router = express.Router();

  static getRouter() {
    this.initRoutes();
    return this.router;
  }

  private static initRoutes() {
    this.router.post('/user/create', UserController.create);
    this.router.post('/user/login', AuthController.login);
    this.router.post('/auth/jwt', AuthController.auth);
  }
}

export default Router.getRouter();
