import express from 'express';
import Home from '../controllers/Home';
import UserController from '../controllers/UserController';

class Router {
  private static router = express.Router();

  static getRoutes() {
    this.initRoutes();
    return this.router;
  }

  private static initRoutes() {
    this.router.get('/', Home.helloWorld);
    this.router.post('/user/create', UserController.create);
    this.router.post('/user/login', UserController.login);
  }
}

export default Router.getRoutes();
