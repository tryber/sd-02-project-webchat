const model = require('../models/messagesModel');

const sendMessage = async (req, res) => {
  const { message, user } = req.body;

  if (!message || !user) {
    return res.status(422).json({ message: 'Missing message or title' });
  }
  await model.messageToDb(message, user);
  res.status(200).json({ message });
}

const sendName = async (req, res) => {
  const { name } = req.body;
  const response = await model.createNewUser(name);
  res.status(201).json({ message: 'Sucess' });
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
