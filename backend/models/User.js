const connection = require('./connection');

getAll = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray());

add = async (nickname) =>
  connection()
    .then((db) => db.collection('users').insertOne({ nickname }));

module.exports = {
  getAll,
  add,
};
