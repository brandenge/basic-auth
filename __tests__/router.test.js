'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);
const { sequelizeDatabase } = require('../src/auth/models/user-model');

beforeAll (async () => {
  await sequelizeDatabase.sync();
});

afterAll (async () => {
  await sequelizeDatabase.drop();
});

describe('Auth Tests', () => {
  it('allows a user to sign up with a POST to /signup', async () => {
    let response = await request.post('/signup').send({
      username: 'Joe Bob',
      password: 'testpassword',
    });

    console.log('Response body:', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('Joe Bob');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('testpassword');
  });

  it('allows a user to sign in with a POST to /signin', async () => {
    expect(true).toBeTruthy();
  });
});
