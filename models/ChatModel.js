const connection = require('./connection');

const saveHistory = async ({ user, message, date }) => {
  const db = await connection();
  await db.collection('history').insertOne({ user, message, date });
};

const savedHistory = async () => {
  const db = await connection();
  const modelAnswer = db.collection('history').find({}).toArray();
  return modelAnswer;
};

const savedMessageByDate = async (date) => {
  const db = await connection();
  const modelAnswer = db.collection('history').findOne({ date });
  return modelAnswer;
};

const saveUsers = async (user) => {
  const db = await connection();
  await db.collection('online').insertOne({ user });
};

const onlineUsers = async () => {
  const db = await connection();
  const modelAnswer = await db.collection('online').find({}).toArray();
  return modelAnswer;
};

const findAndDelete = async (user) => {
  const db = await connection();
  const modelAnswer = await db.collection('online').deleteOne({ user });
  return modelAnswer;
};

module.exports = {
  saveHistory,
  savedHistory,
  savedMessageByDate,
  saveUsers,
  onlineUsers,
  findAndDelete,
};
