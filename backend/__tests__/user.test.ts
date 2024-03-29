import request from 'supertest';
import User from '../src/model/User';
import Database from '../src/db/connect';
require('dotenv').config();
const bcrypt = require('bcrypt');
import AuthService from '../src/services/AuthService';

describe('User schema/model', () => {
  beforeAll(async () => {
    await Database.connect(process.env.MONGODB_URI as string);
  });

  const userData = {
    username: 'vitosnatios',
    email: 'vitosnatios@gmail.com',
    password: 'bacon&banana',
    firstName: 'Vitor',
    lastName: 'Fernandes',
  };

  beforeEach(async () => {
    await User.deleteOne({ username: userData.username });
  });

  afterAll(async () => {
    await User.deleteOne({ username: userData.username });
  });

  it('should compare a right and wrong password', async () => {
    const user = await new User(userData).save();
    const samePassword = await bcrypt.compare('bacon&banana', user.password);
    const wrongPassword = await bcrypt.compare('tryinahack', user.password);
    expect(samePassword).toBeTruthy();
    expect(wrongPassword).toBeFalsy();
  });

  it(`should create from the api, get a 200 status and a jwt, then check the jwt`, async () => {
    const res = await request('http://localhost:' + String(process.env.PORT))
      .post('/api/user/create')
      .send(userData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200);
    const validJwt = await AuthService.verifyToken(res.body.jwt);
    expect(validJwt).toBeTruthy();
  });

  it('should create and get a error/message saying that some usarname already exists', async () => {
    new User(userData).save();
    const res = await request('http://localhost:' + String(process.env.PORT))
      .post('/api/user/create')
      .send(userData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(500);
    expect(res.body.message).toBe(
      'E11000 duplicate key error collection: finance.users index: username_1 dup key: { username: "vitosnatios" }'
    );
  });

  it('should make login and check if there is a valid jwt and ok as response', async () => {
    await new User(userData).save();
    const res = await request('http://localhost:' + String(process.env.PORT))
      .post('/api/user/login')
      .send({ username: userData.username, password: userData.password })
      .expect(200);
    const validJwt = await AuthService.verifyToken(res.body.jwt);
    expect(validJwt).toBeTruthy();
  });
});
