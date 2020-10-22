const { dbConnection } = require('./connection');

const getAllMessages = async () =>
  dbConnection('messages')
    .then((db) => db
      .find()
      .toArray());

const insertMessage = async (message) =>
  dbConnection('messages')
    .then((db) => db
      .insertOne(message));

module.exports = {
  getAllMessages,
  insertMessage,
};
