'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

const options = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  }
  : {};

const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

const UserModel = sequelizeDatabase.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserModel.beforeCreate(async (user) => {
  try {
    user.password = await bcrypt.hash(user.password, 5);
  } catch (error) {
    throw new Error('Password encryption failed');
  }
});

module.exports = {
  sequelizeDatabase,
  UserModel,
};
