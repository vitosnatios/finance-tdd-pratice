const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  private static secret = String(process.env.JWT_SECRET);

  static async generateToken(userId: string) {
    const payload = { userId };
    return await jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  static async verifyToken(token: string): Promise<string | null> {
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

export default AuthService;
