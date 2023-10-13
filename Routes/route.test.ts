import request from 'supertest';
// import app from '../app';
import { describe, it, expect } from 'chai';

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Welcome To Server 2');
  });
});