// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async ({ userName }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ userName }))
    .then(({ insertedId }) => ({ id: insertedId, userName }));

module.exports = {
  createUser,
};
