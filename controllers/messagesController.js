const rescue = require('express-rescue');

const messagesService = require('../services/messagesService');

const sendName = rescue(async (req, res) => {
  const { userName } = req.body;
  const newUserName = await messagesService.createUser({ userName });
  return res.status(200).json(newUserName);
});

const newMessage = rescue(async (req, res) => {
  const { userName, message } = req.body;
  const newMessageService = await messagesService.newMessage({ userName, message });
  return res.status(201).json(newMessageService);
});

const getLog = rescue(async (_req, res) => {
  const log = await messagesService.getLog();
  return res.status(200).json({ log });
});

module.exports = {
  sendName,
  newMessage,
  getLog,
};
