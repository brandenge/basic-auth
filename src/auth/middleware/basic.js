'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UserModel } = require('../models/user-model');

async function basicAuth(req, res, next) {
  const { authorization } = req.headers;
  console.log('Authorization header:', authorization);
  if (!authorization) {
    res.status(401).send('Invalid Login');
  } else {
    const authString = authorization.split(' ')[1];

    const decodedAuthString = base64.decode(authString);
    console.log('Decoded auth string:', decodedAuthString);

    const [ username, password ] = decodedAuthString.split(':');

    try {
      const user = await UserModel.findOne({ where: { username }});
      console.log('user record:', user);
      if (user) {
        const validUser = await bcrypt.compare(password, user.password);
        console.log('Valid user:', validUser);
        if (validUser) {
          req.user = user;
          next();
        } else {
          next('Invalid Login1');
        }
      } else {
        next('Invalid Login2');
      }
    } catch (error) {
      console.error('Failed login attempt', error);
      next('Invalid Login');
    }
  }
}

module.exports = basicAuth;
