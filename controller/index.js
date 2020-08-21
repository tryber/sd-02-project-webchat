const model = require('../models');

const saveUser = async (user) => await model.saveUser(user);

const saveMessage = async (user, message) => {
  const success = await model.saveMessage(user, message);
  return success.date;
};

const getAllMessages = async (_req, res) => {
  const results = await model.getAllMessages();
  return res.status(200).json(results);
};
module.exports = { saveUser, saveMessage, getAllMessages };
