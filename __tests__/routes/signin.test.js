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

describe('Testing the /signin route', () => {
  it('Allows a valid user to signin with a POST to /signin', async () => {
    const token = base64.encode('Joe:joepass');
    const response = await mockRequest.post(`/signin`).set('Authorization', `Basic ${token}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Joe');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('joepass');
  });

  it('Triggers an error when an invalid user attempts to signin with a POST to /signin', async () => {
    let response = await mockRequest.post(`/signin`).send();
    expect(response.status).toEqual(401);
    response = await mockRequest.post(`/signin`).set('Authorization', `Basic invalidEncoding`).send();
    expect(response.status).toEqual(500);
  });
});
