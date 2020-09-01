const model = require('../models/messageModel');

const getMessages = async (_req, res) => {
  const allMessages = await model.getAllMessages();

  res.status(200).json(allMessages);
};

const postMessage = (io) => async (req, res) => {
  const { nickname, message } = req.body;

  if (!nickname || !message) {
    return res.status(422).json({ message: 'Missing message or nickname' });
  }

  await model.createMessage({ nickname, message });

  res.status(200).json({ message: 'Notification emitted' });

  io.emit('notification', {});
};

module.exports = {
  getMessages,
  postMessage,
};
