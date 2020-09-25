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

const savedPrivateMessages = async () => {
  const db = await connection();
  const modelAnswer = db.collection('privateHistory').find({}).toArray();
  return modelAnswer;
};

const savePrivateHistory = async ({ user, message, date, userFor }) => {
  const db = await connection();
  await db.collection('privateHistory').insertOne(
    {
      user,
      message,
      date,
      forWho: userFor,
    },
  );
};

const savedPrivateHistory = async (date) => {
  const db = await connection();
  const modelAnswer = db.collection('privateHistory').findOne({ date });
  return modelAnswer;
};

const savedMessageByDate = async (date) => {
  const db = await connection();
  const modelAnswer = db.collection('history').findOne({ date });
  return modelAnswer;
};

const saveUsers = async (user, socketId) => {
  const db = await connection();
  await db.collection('online').updateOne(
    { socket: socketId },
    { $set: { user, socket: socketId } },
    { upsert: true },
  );
};

const onlineUsers = async () => {
  const db = await connection();
  const modelAnswer = await db.collection('online').find({}).toArray();
  return modelAnswer;
};

const findAndDelete = async (socketId) => {
  const db = await connection();
  const modelAnswer = await db.collection('online').deleteOne({ socket: socketId });
  return modelAnswer;
};

module.exports = {
  saveHistory,
  savedHistory,
  savedMessageByDate,
  saveUsers,
  onlineUsers,
  findAndDelete,
  savePrivateHistory,
  savedPrivateHistory,
  savedPrivateMessages,
};
