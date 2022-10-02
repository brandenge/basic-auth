'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const mockRequest = supertest(app);
const { sequelizeDatabase } = require('../../src/auth/models/user-model');

beforeAll (async () => {
  await sequelizeDatabase.sync();
});

afterAll (async () => {
  await sequelizeDatabase.drop();
  await sequelizeDatabase.close();
});

describe('Testing the /signup route', () => {
  it('Allows a user to signup with a valid POST to /signup', async () => {
    const user = {
      username: 'Joe1',
      password: 'joepass1',
    };
    const response = await mockRequest.post(`/signup`).send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual(user.username);
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('joepass');
  });

  it('Does not allow a user to signup with an invalid POST to /signup', async () => {
    const user = {
      user: 'Joe2',
      pass: 'joepass2',
    };
    const response = await mockRequest.post(`/signup`).send(user);
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('There was an error creating the user');
  });
});
