const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  return db
    .collection('messages')
    .find()
    .sort({ timestamp: 1 })
    .toArray();
};

const recordUser = async ({ user }) => {
  const db = await connection();
  const registeredUser = await db.collection('users').findOne({ user });
  const response = !registeredUser
    ? db.collection('users').insertOne({ user })
    : registeredUser;
  return response;
};

const recordMessage = async ({ user, message }) => {
  const db = await connection();
  const newMessage = await db
    .collection('messages')
    .insertOne({ user, message, timestamp: Date.now() });
  return newMessage.ops[0];
};

module.exports = {
  recordMessage,
  recordUser,
  getAllMessages,
};
