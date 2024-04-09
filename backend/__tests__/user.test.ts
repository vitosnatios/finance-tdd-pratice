import User from '../src/model/User';
import MockServerRequest from '../mocks/MockServerRequest';
import UserController from '../src/controllers/UserController';
import MockDbConnection from '../mocks/MockDbConnection';
import AuthController from '../src/controllers/AuthController';

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

  it('should login, receive a JWT from the body, validate it, get the user from the id inside the token', async () => {
    const { username, password, ...rest } = userData;
    const { status, jwt } = await MockServerRequest.post(AuthController.login, {
      username,
      password,
    });
    expect(status).toBe(200);
    expect(jwt).toBeDefined();
    const { status: userStatus, user } = await MockServerRequest.post(
      UserController.getUserByItsJwtId,
      { jwt }
    );
    expect(userStatus).toBe(200);
    expect(user).toMatchObject({ ...rest, username });
    expect(user.password).not.toBeDefined();
  });
});
