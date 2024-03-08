import request from 'supertest';

describe('Testing jest', () => {
  it('Should access "/" endpoint and get a "Hello World" message', async () => {
    const res = await request('http://localhost:3000').get('/api');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello world!');
  });
});
