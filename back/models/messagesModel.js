const { dbConnection } = require('./connection');

const getAllMessages = async () =>
  dbConnection()
    .then((db) => db
      .find()
      .toArray());

module.exports = {
  getAllMessages,
};
