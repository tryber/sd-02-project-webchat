const connection = require('./connection');

getAll = async () =>
  connection().then((db) => db.collection('chats').find().toArray());

add = async ({ nickname = '', date = '', message = '' }) =>
  connection().then((db) =>
    db.collection('chats').insertOne({ nickname, date, message }),
  );

module.exports = {
  getAll,
  add,
};
