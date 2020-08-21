const Chat = require('../models/Chat');

const findAll = async (_req, res) => {
  const chats = await Chat.getAll();
  return res.status(200).json(chats);
};

const add = async (req, res) => {
  const { nickname, message } = req.body;
  const date = new Date();

  const response = await Chat.add({ nickname, message, date });

  res.status(201).json(response.ops[0]);
};

module.exports = {
  findAll,
  add,
};
