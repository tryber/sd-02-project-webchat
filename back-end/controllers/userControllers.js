const rescue = require('express-rescue');
const ChatModel = require('../models/ChatModels');

const saveNickname = rescue(async (req, res) => {
  const { nickname } = req.body;
  const addUser = await ChatModel.saveNickname(nickname);
  console.log(addUser);
  if (addUser) return res.status(200).json({ inserted: true });
  return res.status(500).json({ inserted: false });
});

module.exports = {
  saveNickname,
};
