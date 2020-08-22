const rescue = require('express-rescue');
const messagesService = require('../services/messagesService');

const getAllMessages = rescue(async (_req, res) => {
  const serviceAnswer = await messagesService.getAllMessages();
  res.status(200).json(serviceAnswer);
});

const createName = rescue(async (req, res) => {
  const { name } = req.body;
  const serviceAnswer = await messagesService.createName(name);
  res.status(201).json(serviceAnswer);
});

const createMessage = rescue(async (req, res) => {
  const { name, message, messageDate } = req.body;
  const serviceAnswer = await messagesService.createMessage({ name, message, messageDate });
  res.status(201).json(serviceAnswer);
});

module.exports = {
  getAllMessages,
  createName,
  createMessage,
};
