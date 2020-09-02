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

module.exports = {
  saveHistory,
  savedHistory,
  savedMessageByDate,
};
