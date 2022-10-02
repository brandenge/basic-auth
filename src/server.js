'use strict';

const express = require('express');
const router = require('./auth/router');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

module.exports = { app, start };
