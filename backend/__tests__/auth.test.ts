import User from '../src/model/User';
import Database from '../src/db/connect';
require('dotenv').config();
import AuthService, { AuthClass } from '../src/services/AuthService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserController from '../src/controllers/UserController';
import MockServerRequest from '../mocks/MockServerRequest';

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
    const samePassword = await AuthClass.comparePasswords(
      'bacon&banana',
      user.password
    );
    const wrongPassword = await AuthClass.comparePasswords(
      'tryinahack',
      user.password
    );
    expect(samePassword).toBeTruthy();
    expect(wrongPassword).toBeFalsy();
  });

  it(`should create a user, get a 200 status and a jwt, then check the jwt`, async () => {
    const newUser = await new User(userData).save();
    const jwt = await AuthService.generateToken(String(newUser.id));
    const validJwt = await AuthService.verifyToken(jwt);
    expect(validJwt).toBeTruthy();
    expect(validJwt).toBe(String(newUser.id));
  });

  it('should make login and check if there is a valid jwt and ok as response', async () => {
    await new User(userData).save();
    const controllerResponse = await MockServerRequest.post(
      UserController.login,
      {
        username: userData.username,
        password: userData.password,
      }
    );
    const validJwt = await AuthService.verifyToken(controllerResponse.jwt);
    expect(controllerResponse.status).toBe(200);
    expect(validJwt).toBeTruthy();
  });
});
