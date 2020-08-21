const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'WebChat';
const getSchema = async () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      process.exit(1);
    });

const saveUser = async (name) => {
  const results = await getSchema().then((db) =>
    db.collection('chatUsers').find({ name }).toArray(),
  );
  if (results.length === 0) {
    getSchema().then((db) => db.collection('chatUsers').insertOne({ name }));
  }
};

const saveMessage = async (name, message) => {
  const date = new Date();
  return {
    ...getSchema().then((db) =>
      db
        .collection('chatUsers')
        .updateOne({ name }, { $push: { message: { content: message, date } } }),
    ),
    date,
  };
};

const getAllMessages = async () =>
  getSchema().then((db) => db.collection('chatUsers').find().toArray());

module.exports = { saveUser, saveMessage, getAllMessages };
