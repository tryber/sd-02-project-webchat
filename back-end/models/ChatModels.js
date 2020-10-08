const connection = require('./connections');

const saveNickname = async (nickname) => {
  try {
    const db = await connection();
    const existUser = await db.collection('users').findOne({ nickname });
    if (existUser) return false;
    await db.collection('users').insertOne({ nickname, messages: [] });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const savePrivateMessage = async (sender, reciever, message) => {
  try {
    const db = await connection();
    await db
      .collection('privateMessages')
      .insertOne({ sender, reciever, message, timestamp: Date.now() });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllPvtMessages = async (sender, reciever) => {
  try {
    const db = await connection();
    const allPvtMessages = await db
      .collection('privateMessages')
      .find({
        $and: [
          {
            sender: { $in: [sender, reciever] },
          },
          {
            reciever: { $in: [sender, reciever] },
          },
        ],
      })
      .toArray();
    return allPvtMessages;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const saveAllMessages = async (message, nickname) => {
  try {
    const db = await connection();
    await db
      .collection('messages')
      .insertOne({ nickname, message, timestamp: Date.now() });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllMessages = async () => {
  try {
    const db = await connection();
    const allMessages = await db.collection('messages').find().toArray();
    return allMessages;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  saveNickname,
  saveAllMessages,
  getAllMessages,
  savePrivateMessage,
  getAllPvtMessages,
};
