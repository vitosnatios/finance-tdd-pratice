import User from '../src/model/User';
import MockServerRequest from '../__mocks__/MockServerRequest';
import UserController from '../src/controllers/UserController';
import MockDbConnection from '../__mocks__/MockDbConnection';

describe('User schema/model', () => {
  const userData = {
    username: 'vitosnatios',
    email: 'vitosnatios@gmail.com',
    password: 'bacon&banana',
    firstName: 'Vitor',
    lastName: 'Fernandes',
  };

  beforeAll(async () => {
    await MockDbConnection.connect();
  });

  afterAll(async () => {
    await MockDbConnection.disconnect();
  });

  it('should create and get a error/message saying that some usarname already exists', async () => {
    const newUser = await new User(userData).save();
    expect(newUser.email).toBe(userData.email);
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
