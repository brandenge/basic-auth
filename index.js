'use strict';

const { sequelizeDatabase } = require('./src/auth/models');
const { start } = require('./src/server');

sequelizeDatabase.sync()
  .then(() => console.log('Successful connection to database'))
  .catch(error => console.error('Could not start server', error.message));

start();
