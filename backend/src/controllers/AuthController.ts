import { Request, Response } from 'express';
import User from '../model/User';
import AuthService from '../services/AuthService';

class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      if (!username.trim() || !password.trim())
        throw new Error('Please, fill all the fields');
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid username or password');
      const isPasswordValid = await AuthService.comparePasswords(
        password,
        user.password
      );
      if (!isPasswordValid) throw new Error('Invalid username or password');
      const jwt = await AuthService.generateToken(user.id.toString());
      return res.status(200).json({ jwt });
    } catch (error) {
      return res.status(401).json({
        message:
          error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export default AuthController;
