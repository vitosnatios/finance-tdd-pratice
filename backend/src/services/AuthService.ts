const jwt = require('jsonwebtoken');

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
}

export default new AuthService(String(process.env.JWT_SECRET));
