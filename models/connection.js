const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = process.env.DB_URL;
const MONGO_DB_DATABASE = process.env.DB_DATABASE;
const connection = async () =>
  mongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => conn.db(MONGO_DB_DATABASE));

module.exports = connection;
