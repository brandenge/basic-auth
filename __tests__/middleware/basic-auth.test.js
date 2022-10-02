'use strict';

const { sequelizeDatabase, UserModel } = require('../src/auth/models/user-model');
const basicAuth = require('../src/auth/middleware/basic');

beforeAll(async () => {
  await sequelizeDatabase.sync();
  await UserModel.create(user);
});

afterAll(async () => {
  await sequelizeDatabase.drop();
  await sequelizeDatabase.close();
});

const user = {
  username: 'Joe Bob',
  password: 'testpassword',
};

describe('Basic Authentication Middleware Tests', () => {
  it('Should properly authenticate a valid user', () => {
    const req = {
      headers: {
        authorization: 'Basic Sm9lIEJvYjp0ZXN0cGFzc3dvcmQ=',
      },
    };
    const res = {};
    const next = jest.fn();

    basicAuth(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith();
    });
  });

  it('Should not authorize an invalid user', () => {
    const req = {
      headers: {
        authorization: 'Basic invalidCredentials',
      },
    };
    const res = {};
    const next = jest.fn();
    basicAuth(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith('Invalid Login');
    });
  });
});
