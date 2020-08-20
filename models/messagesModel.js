const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  return db.collection('chatMessages').find().toArray();
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

module.exports = {
  getAllMessages,
  createNewUser,
};
