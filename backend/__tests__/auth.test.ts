import User from '../src/model/User';
import AuthService from '../src/services/AuthService';
import MockServerRequest from '../__mocks__/MockServerRequest';
import AuthController from '../src/controllers/AuthController';
import UserController from '../src/controllers/UserController';
import MockDbConnection from '../__mocks__/MockDbConnection';

describe('Auth', () => {
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

  beforeEach(async () => {
    await User.deleteOne({ username: userData.username });
  });

  afterAll(async () => {
    await MockDbConnection.disconnect();
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

  it('should create a jwt and check it', async () => {
    const mockedId = '1234567890';
    const jwt = await AuthService.generateToken(String(mockedId));
    const validJwt = await AuthService.verifyToken(jwt);
    expect(validJwt).toBeTruthy();
    expect(validJwt).toBe(String(mockedId));
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

  it('should receive a invalid jwt and respond with an error', async () => {
    const controllerResponse = await MockServerRequest.post(
      AuthController.auth,
      { jwt: 'invalid-jwt' }
    );
    expect(controllerResponse.status).toBe(401);
    expect(controllerResponse.message).toBe('Please, make login.');
  });

  it('should receive a valid jwt and respond with the user data', async () => {
    const userControllerResponse = await MockServerRequest.post(
      UserController.create,
      { ...userData }
    );
    const { jwt } = userControllerResponse;
    const { status, user } = await MockServerRequest.post(AuthController.auth, {
      jwt,
    });
    expect(status).toBe(200);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBeUndefined();
  });
});
