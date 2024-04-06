import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

class Router {
  private static router = express.Router();

  static getRoutes() {
    this.initRoutes();
    return this.router;
  }

  private static initRoutes() {
    this.router.post('/user/create', UserController.create);
    this.router.post('/user/login', AuthController.login);
  }
}

export default Router.getRoutes();
