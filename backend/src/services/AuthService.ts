const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }

  async generateToken(userId: string) {
    const payload = { userId };
    return await jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  async verifyToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }

  static async comparePasswords(
    rawPassword: string,
    encriptedPassword: string
  ) {
    return await bcrypt.compare(rawPassword, encriptedPassword);
  }

  static async encriptPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }
}

export default new AuthService(String(process.env.JWT_SECRET));
export const AuthClass = AuthService;
