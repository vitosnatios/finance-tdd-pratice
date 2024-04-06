import User from '../src/model/User';
import Database from '../src/db/connect';
require('dotenv').config();
import AuthService from '../src/services/AuthService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import MockServerRequest from '../mocks/MockServerRequest';
import AuthController from '../src/controllers/AuthController';

describe('Auth', () => {
  const userData = {
    username: 'vitosnatios',
    email: 'vitosnatios@gmail.com',
    password: 'bacon&banana',
    firstName: 'Vitor',
    lastName: 'Fernandes',
  };

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await Database.connect(mongoServer.getUri());
  });

  beforeEach(async () => {
    await User.deleteOne({ username: userData.username });
  });

  afterAll(async () => {
    await User.deleteOne({ username: userData.username });
  });

  it('should compare a right and wrong password', async () => {
    const user = await new User(userData).save();
    const samePassword = await AuthService.comparePasswords(
      'bacon&banana',
      user.password
    );
    const wrongPassword = await AuthService.comparePasswords(
      'tryinahack',
      user.password
    );
    expect(samePassword).toBeTruthy();
    expect(wrongPassword).toBeFalsy();
  });

  it('should create a user and use its id to create a jwt, then check the jwt', async () => {
    const newUser = await new User(userData).save();
    const jwt = await AuthService.generateToken(String(newUser.id));
    const validJwt = await AuthService.verifyToken(jwt);
    expect(validJwt).toBeTruthy();
    expect(validJwt).toBe(String(newUser.id));
  });

  it('should make login and check if there is a valid jwt and ok as response', async () => {
    await new User(userData).save();
    const { username, password } = userData;
    const controllerResponse = await MockServerRequest.post(
      AuthController.login,
      { username, password }
    );
    const validJwt = await AuthService.verifyToken(controllerResponse.jwt);
    expect(controllerResponse.status).toBe(200);
    expect(validJwt).toBeTruthy();
  });
});
