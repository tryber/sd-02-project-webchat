const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages')
    .aggregate([{ $unwind: '$messages' }]).toArray();
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
  const { name: nome, message, messageDate } = messageInfo;
  const db = await connection();
  const newMessage = await db.collection('messages').updateOne(
    { name: nome },
    { $push: { messages: { postedAt: messageDate, content: message } } },
  );
  return newMessage;
};

module.exports = {
  getAllMessages,
  createName,
  createMessage,
};
