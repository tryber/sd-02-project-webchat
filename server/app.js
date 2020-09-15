require('dotenv').config();

const bodyParser = require('body-parser');

const express = require('express');

const path = require('path');

const middlewares = require('./middlewares');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(middlewares.error);

module.exports = app;
