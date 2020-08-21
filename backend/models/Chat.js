const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('chats').find().toArray());

const add = async ({ nickname = '', date = '', message = '' }) =>
  connection().then((db) =>
    db.collection('chats').insertOne({ nickname, date, message }),
  );

module.exports = {
  getAll,
  add,
};
