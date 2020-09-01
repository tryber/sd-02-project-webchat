const models = require('../models');

const getAllMessages = async (_req, res) =>
  models.getAllMessages()
    .then((messages) => res.status(200).json({ messages }))
    .catch((error) => res.status(500).json({ error }));

const recordMessage = async (req, res) => {
  const { user, message } = req.body;

  if (!message) {
    return res.status(422).json({ message: 'Missing message' });
  }

  try {
    await models.recordMessage({ user, message });
    res.status(200).json({ user, message });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const recordUser = async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(422).json({ message: 'Missing user' });
  }

  try {
    await models.recordUser({ user });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  recordMessage,
  recordUser,
  getAllMessages,
};
