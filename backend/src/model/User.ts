import { Document, Schema, model } from 'mongoose';
import { AuthClass } from '../services/AuthService';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class UserSchema extends Schema<User> {
  constructor() {
    super({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    });

    this.pre('save', async function (next) {
      try {
        this.password = await AuthClass.encriptPassword(this.password);
        next();
      } catch (error) {
        console.error('Error hashing password:', error);
      }
    });
  }
}

export default model<User>('User', new UserSchema());
