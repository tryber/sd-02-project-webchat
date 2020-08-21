const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').aggregate([{ $unwind: '$messages' }]).toArray();
  return allMessages;
};

const createName = async (name) => {
  const db = await connection();
  const findUser = await db.collection('messages').findOne({ name });
  if (!findUser) {
    const createUser = await db.collection('messages').insertOne({ name });
    return createUser.ops[0];
  }
  return findUser;
};

const createMessage = async (messageInfo) => {
  const { nomeUsuario, mensagemEnviada, data } = messageInfo;
  const db = await connection();
  const newMessage = await db.collection('messages').findOneAndUpdate(
    { name: nomeUsuario },
    { $push: { messages: { postedAt: data, content: mensagemEnviada } } },
    { upsert: true },
    { returnOriginal: false },
  );
  return newMessage.value;
};

module.exports = {
  getAllMessages,
  createName,
  createMessage,
};
