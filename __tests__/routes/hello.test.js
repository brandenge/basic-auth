'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const mockRequest = supertest(app);
const { sequelizeDatabase, UserModel } = require('../../src/auth/models/user-model');
const base64 = require('base-64');

beforeAll(async () => {
  await sequelizeDatabase.sync();
  await UserModel.create({ username: 'Joe', password: 'joepass' });
});

afterAll(async () => {
  await sequelizeDatabase.drop();
  await sequelizeDatabase.close();
});

describe('Testing the /hello route', () => {
  it('Succeeds when basic authentication succeeds', async () => {
    const token = base64.encode('Joe:joepass');
    const response = await mockRequest.get(`/hello?name=Bob`).set('Authorization', `Basic ${token}`).send();
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(`Hello from Bob! This route is now secured by HTTP Basic authentication`);
  });

  it('Fails when basic authentication fails', async () => {
    let response = await mockRequest.get(`/hello?name=Bob`).send();
    expect(response.status).toEqual(401);
    response = await mockRequest.get(`/hello?name=Bob`).set('Authorization', `Basic invalidEncoding`).send();
    expect(response.status).toEqual(500);
  });
});
