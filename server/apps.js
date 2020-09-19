require('dotenv').config();

const bodyParser = require('body-parser');

const path = require('path');

const app = require('express')();

const socketIoServer = require('http').createServer();

const events = require('socket.io')(socketIoServer);

const middlewares = require('./middlewares');

const { chatRouter, messageRouter, userRouter } = require('./app');

const { Chat, Message, User } = require('./env');

const { chatModel, messageModel, userModel } = require('./resource');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/chat', chatRouter({ Chat, chatModel, middlewares, events }));

app.use('/message', messageRouter({ Message, messageModel, middlewares, events }));

app.use('/user', userRouter({ User, userModel, middlewares }));

app.use(middlewares.error);

module.exports = { app, io: events };
