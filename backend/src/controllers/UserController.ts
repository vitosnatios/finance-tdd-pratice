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

  static async getUserByItsJwtId(req: Request, res: Response) {
    try {
      const { jwt } = req.body;
      if (!jwt) throw new Error('no JWT at the body');
      const userId = await AuthService.verifyToken(jwt);
      if (!userId) throw new Error('invalid JWT');
      const user = await User.findById(userId).select([
        '-_id',
        '-password',
        '-__v',
      ]);
      if (!user) throw new Error('Error getting User Data');
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'UserController Error',
      });
    }
  }
}

export default UserController;
