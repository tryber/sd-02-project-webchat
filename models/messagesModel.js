const connection = require('./connection');

const getAllMessages = async () => connection()
  .then((db) => db.collection('chatMessages').aggregate([
    { $unwind: '$messages' },
    { $sort: { 'messages.time': -1 } },
  ]).toArray());

const createNewUser = async (name) => connection()
  .then((db) => db.collection('chatMessages').findOneAndUpdate(
    { name },
    {
      $setOnInsert: { name, messages: [] },
    },
    {
      returnOriginal: false,
      upsert: true,
    },
  ));

const messageToDb = async (message, user) => connection()
  .then((db) => db.collection('chatMessages').updateOne(
    { name: user },
    {
      $push: {
        messages: { content: message, timestamp: Date.now() },
      },
    },
  ));

module.exports = {
  getAllMessages,
  createNewUser,
  messageToDb,
};
