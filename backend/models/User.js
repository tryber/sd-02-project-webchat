const connection = require('./connection');

getAll = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray());

add = async () =>
  connection()
    .then((db) => db.collection('users').insertOne());

module.exports = {
  getAll,
  add,
};
