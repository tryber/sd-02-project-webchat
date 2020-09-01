const messagesModel = require('../models/messagesModel');

const createUser = async ({ userName }) => {
  const createUserOnModel = await messagesModel.createUser({ userName });
  return createUserOnModel;
};

const newMessage = async ({ userName, message }) => {
  const newMessageOnModel = await messagesModel.newMessage({ userName, message });
  return newMessageOnModel;
};

const getLog = async () => messagesModel.getLog();

module.exports = {
  createUser,
  newMessage,
  getLog,
};
