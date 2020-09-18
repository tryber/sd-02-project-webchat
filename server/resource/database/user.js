const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
  email: String,
  image: String,
  nickname: String,
  password: String,
});

module.exports = mongoose.Model('user', userSchema);
