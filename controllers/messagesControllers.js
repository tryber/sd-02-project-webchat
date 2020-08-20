const model = require('../models/messagesModel');

const sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(422).json({ message: 'Missing message or title' });
  }

  io.emit('new message', { message });

  res.status(200).json({ message: `Notification emitted: ${message}` });
}

const sendName = async (req, res) => {
  res.status(200).json({ message: 'Aqui' });
}

const getMessages = async (req, res) => {
  const messages = await model.getAllMessages();
  res.status(200).json({ message: messages });
}

module.exports = {
  sendMessage,
  sendName,
  getMessages,
};
