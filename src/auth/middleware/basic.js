'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UserModel } = require('../models/user-model');

async function basicAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send('Invalid Login');
  } else {
    try {
      const authString = authorization.split(' ')[1];
      const decodedAuthString = base64.decode(authString);
      const [ username, password ] = decodedAuthString.split(':');
      const user = await UserModel.findOne({ where: { username }});
      if (user) {
        const validUser = await bcrypt.compare(password, user.password);
        if (validUser) {
          req.user = user;
          next();
        } else {
          next('Invalid Login');
        }
      } else {
        next('Invalid Login');
      }
    } catch (error) {
      console.error('Failed login attempt', error);
      next('Invalid Login');
    }
  }
}

module.exports = basicAuth;
