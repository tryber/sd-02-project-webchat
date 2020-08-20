const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  return db.collection('chatMessages').find().toArray();
};

module.exports = {
  getAllMessages,
};
