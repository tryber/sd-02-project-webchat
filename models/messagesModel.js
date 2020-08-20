const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  return db.collection('chatMessages').aggregate([
    { $unwind: "$messages" },
    { $sort: { "messages.time": -1 } },
  ]).toArray();
};

const createNewUser = async (name) => {
  const db = await connection();
  const result = await db.collection('chatMessages').findOneAndUpdate(
    { name },
    {
      $setOnInsert: { name, messages: [] },
    },
    {
      returnOriginal: false,
      upsert: true,
    }
  );
};

const messageToDb = async (message, user) => {
  const db = await connection();
  const result = await db.collection('chatMessages').updateOne(
    { name: user },
    {
      $push: {
        messages: { content: message, timestamp: Date.now() }
      }
    }
  );
}

module.exports = {
  getAllMessages,
  createNewUser,
  messageToDb,
};
