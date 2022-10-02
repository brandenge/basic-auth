'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    typeValidation: true,
  } : {
    logging: true,
    typeValidation: true,
  };

const sequelizeDatabase = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

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
