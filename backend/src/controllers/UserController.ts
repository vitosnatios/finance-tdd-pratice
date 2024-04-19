import { Request, Response } from 'express';
import User from '../model/User';
import AuthService from '../services/AuthService';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      const jwt = await AuthService.generateToken(String(newUser.id));
      return res.status(200).json({ jwt, id: String(newUser.id) });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'UserController Error',
      });
    }
  }
}

export default UserController;
