'use strict';

const express = require('express');
const { UserModel } = require('./models/user-model');
const basicAuth = require('./middleware/basic');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);
    const record = await UserModel.create({ username, password });
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send('There was an error creating the user');
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/hello', basicAuth, (req, res) => {
  const { name } = req.query;
  res.status(200).send(`Hello from ${name}! This route is now secured by HTTP Basic authentication`);
});

module.exports = router;
