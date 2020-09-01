const connection = require('./connection');

const getAllMessages = () => connection()
  .then((db) => db.collection('messages').find().toArray())
  .then((messages) => messages.map(({ nickname, content, sentAt }) => ({
    nickname,
    content,
    sentAt,
  })));

const createMessage = ({ nickname, message }) => connection()
  .then((db) => db.collection('messages').insertOne({
    nickname,
    content: message,
    sentAt: new Date(),
  }));

module.exports = {
  getAllMessages,
  createMessage,
};
