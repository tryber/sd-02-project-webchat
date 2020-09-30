const rescue = require('express-rescue');
const ChatModel = require('../models/ChatModels');

const saveNickname = rescue(async (req, res) => {
  const { nickname } = req.body;
  const addUser = await ChatModel.saveNickname(nickname);
  if (addUser) return res.status(200).end();
  return res.status(500).end();
});

const insertMessages = rescue(async (req, res) => {
  const { message, nickname } = req.body;
  const insertedMsg = await ChatModel.saveAllMessages(message, nickname);
  if (insertedMsg) return res.status(200).end();
  return res.status(500).end();
});

const getAllChats = rescue(async (_req, res) => {
  const allMessages = await ChatModel.getAllMessages();
  res.status(200).json({ allMessages });
});

module.exports = {
  saveNickname,
  insertMessages,
  getAllChats,
};
