'use strict';

const { sequelizeDatabase, UserModel } = require('../../src/auth/models/user-model');
const basicAuth = require('../../src/auth/middleware/basic');

const user = {
  username: 'Joe Bob',
  password: 'testpassword',
};

beforeAll(async () => {
  await sequelizeDatabase.sync();
  await UserModel.create(user);
});

afterAll(async () => {
  await sequelizeDatabase.drop();
  await sequelizeDatabase.close();
});

describe('Test basic authentication middleware', () => {
  it('Authenticates a valid user', async () => {
    const req = {
      headers: {
        authorization: 'Basic Sm9lIEJvYjp0ZXN0cGFzc3dvcmQ=',
      },
    };
    const res = {};
    const next = jest.fn();

    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('Does not authenticate an invalid user', async () => {
    const req = {
      headers: {
        authorization: 'Basic invalidCredentials',
      },
    };
    const res = {};
    const next = jest.fn();
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
});
