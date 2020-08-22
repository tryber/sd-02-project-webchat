const messagesModel = require('../models/messagesModel');

const getAllMessages = async () => {
  const result = await messagesModel.getAllMessages();
  result.sort((a, b) => new Date(a.messages.postedAt) - new Date(b.messages.postedAt));
  return result;
};

const createName = async (name) => messagesModel.createName(name);

const createMessage = async (messageInfo) => messagesModel.createMessage(messageInfo);

module.exports = {
  getAllMessages,
  createName,
  createMessage,
};
