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

const existPrivateChat = async (user, forUser) => {
  const db = await connection();
  const modelAnswer = await db.collection('privateHistory').findOne(
    {
      users: { $all: [user, forUser] },
    },
  );
  return modelAnswer;
};

const savePrivateHistory = async ({ user, message, date, userFor }) => {
  const db = await connection();
  await db.collection('privateHistory').insertOne(
    {
      users: [user, userFor],
      messages: [{ user, message, date }],
    },
  );
};

const updatePrivateHistory = async ({ user, message, date, userFor }) => {
  const db = await connection();
  await db.collection('privateHistory').updateOne(
    { users: { $all: [user, userFor] } },
    {
      $push: { messages: { user, message, date } },
    },
  );
};

const savedPrivateMessages = async (user, forUser) => {
  const db = await connection();
  const modelAnswer = await db.collection('privateHistory')
    .aggregate([
      { $match: { users: { $all: [user, forUser] } } },
      { $unwind: '$messages' },
      { $sort: { 'messages.date': -1 } },
      { $group: { _id: '$users', messages: { $push: '$messages' } } },
      { $project: { _id: 0, users: '$_id', messages: { $arrayElemAt: ['$messages', 0] } } },
    ]).toArray();
  return modelAnswer;
};

const savedPrivateHistory = async (user, userFor) => {
  const db = await connection();
  const modelAnswer = await db.collection('privateHistory')
    .aggregate([
      { $match: { users: { $all: [user, userFor] } } },
      { $unwind: '$messages' },
      { $sort: { 'messages.date': 1 } },
      { $group: { _id: '$users', messages: { $push: '$messages' } } },
      { $project: { _id: 0, messages: 1 } },
    ]).toArray();
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
  existPrivateChat,
  updatePrivateHistory,
};
