import { Request, Response } from 'express';
import User from '../model/User';
import AuthService from '../services/AuthService';
const bcrypt = require('bcrypt');

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      const jwt = await AuthService.generateToken(String(newUser.id));
      res.status(200).json({ jwt, id: String(newUser.id) });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : 'UserController Error',
      });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid username or password');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid username or password');
      const jwt = await AuthService.generateToken(user.id.toString());
      res.json({ jwt });
    } catch (error) {
      return res.status(401).json({
        message:
          error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export default new UserController();
