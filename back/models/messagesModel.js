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

const findPrivateChat = async (sendUser, receivedUser) =>
  dbConnection('privateChat')
    .then((db) => db
      .findOne({ users: { $all: [sendUser, receivedUser] } }));

const createPrivateChat = async ({
  sendUser, receiveUser, message, time = Date(),
}) =>
  dbConnection('privateChat')
    .then((db) => db
      .insertOne({
        users: [sendUser, receiveUser],
        messages: [
          {
            sendUser,
            time,
            message,
          }
        ]
      }));

const updateMessagePrivate = async ({
  sendUser, receiveUser, message, time = Date(),
}) =>
  dbConnection('privateChat')
    .then((db) => db
      .updateOne({
        users: { $all: [sendUser, receiveUser] }
      },
        {
          $push: {
            messages: { sendUser, time, message }
          }
        }
      ));

module.exports = {
  getAllMessages,
  insertMessage,
  findPrivateChat,
  createPrivateChat,
  updateMessagePrivate,
};
