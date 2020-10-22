const { dbConnection } = require('./connection');

const newOnlineUser = async (obj) =>
  dbConnection('onlineUsers')
    .then((db) => db
      .updateOne(
        { nickname: obj.nickname },
        { $set: obj },
        { upsert: true }
      ));

const findOnlineUsers = async () =>
  dbConnection('onlineUsers')
    .then((db) => db
      .find()
      .toArray());

const deleteUser = async (id) =>
  dbConnection('onlineUsers')
    .then((db) => db
      .deleteOne({ id }));

module.exports = {
  newOnlineUser,
  findOnlineUsers,
  deleteUser,
};
