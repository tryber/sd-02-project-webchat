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

const saveMessage = async (nickname, message) => {
  try {
    const db = await connection();
    const updatedUser = await db
      .collection('users')
      .updateOne({ nickname }, { $push: { messages: message } }, { upsert: true });
    console.log(updatedUser);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  saveNickname,
};
