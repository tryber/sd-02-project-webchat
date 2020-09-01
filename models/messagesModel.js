// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async ({ userName }) =>
  connection()
    .then((db) => db.collection('messages').findOneAndUpdate(
      { userName },
      { $setOnInsert: { log: [] } },
      { returnOriginal: false, upsert: true },
    ))
    .then(({ insertedId }) => ({ id: insertedId, userName }));

const newMessage = async ({ userName, message }) => {
  const date = new Date();
  return connection()
    .then((db) => db.collection('messages').updateOne(
      { userName },
      {
        $push: { log: { text: message, date } },
      },
    ))
    .then(({ insertedId }) => ({ id: insertedId, userName, message, date }));
};

const getLog = async () =>
  connection()
    .then((db) => db.collection('messages').find()
      .sort({ date: 1 })
      .toArray());

module.exports = {
  createUser,
  newMessage,
  getLog,
};
