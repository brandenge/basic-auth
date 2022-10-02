'use strict';

const { sequelizeDatabase } = require('./src/auth/models/user-model');
const { start } = require('./src/server');

sequelizeDatabase.sync()
  .then(() => console.log('Successful connection to the database'))
  .catch(error => console.error('Could not start server', error.message));

start();
