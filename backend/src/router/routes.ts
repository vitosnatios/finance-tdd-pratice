import express from 'express';
import UserController from '../controllers/UserController';

class Router {
  private static router = express.Router();

  static getRoutes() {
    this.initRoutes();
    return this.router;
  }

  private static initRoutes() {
    this.router.post('/user/create', UserController.create);
    this.router.post('/user/login', UserController.login);
  }
}

export default Router.getRoutes();
