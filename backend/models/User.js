const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray());

const add = async (nickname) =>
  connection()
    .then((db) => db.collection('users').insertOne({ nickname }));

module.exports = {
  getAll,
  add,
};
