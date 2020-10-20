const { dbConnection } = require('./connection');

const getAllMessages = async () =>
  dbConnection()
    .then((db) => db
      .find()
      .toArray());

const insertMessage = async (message) =>
  dbConnection()
    .then((db) => db
      .insertOne(message))

module.exports = {
  getAllMessages,
  insertMessage,
};
