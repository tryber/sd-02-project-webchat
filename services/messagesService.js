const messagesModel = require('../models/messagesModel');

const createUser = async ({ userName }) => {
  // if (!existsCheck(name)) { return 409; }
  const createUserOnModel = await messagesModel.createUser({ userName });
  return createUserOnModel;
};

module.exports = {
  createUser,
};
