import User from '../src/model/User';
import Database from '../src/db/connect';
require('dotenv').config();
import { MongoMemoryServer } from 'mongodb-memory-server';
import MockServerRequest from '../mocks/MockServerRequest';
import UserController from '../src/controllers/UserController';

describe('User schema/model', () => {
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
    await User.deleteOne({ username: userData.username });
  });

  afterEach(async () => {
    await User.deleteOne({ username: userData.username });
  });

  it('should create and get a error/message saying that some usarname already exists', async () => {
    await new User(userData).save();
    const controllerResponse = await MockServerRequest.post(
      UserController.create,
      userData
    );
    expect(controllerResponse.status).toBe(500);
    expect(controllerResponse.message).toContain(
      'index: username_1 dup key: { username: "vitosnatios'
    );
  });
});
