const User = require('../models/User');

const findAll = async (_req, res) => {
  const users = await User.getAll();
  return res.status(200).json(users);
};

const add = async (req, res) => {
  const { nickname } = req.body;

  const response = await User.add(nickname);

  res.status(201).json(response.ops[0]);
};

module.exports = {
  findAll,
  add,
};
