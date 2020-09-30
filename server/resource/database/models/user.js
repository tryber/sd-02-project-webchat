const mongoose = require('../connection');

const userSchema = new mongoose.Schema(
  {
    email: String,
    friends: String,
    image: String,
    nickname: String,
    password: String,
    isOnline: Boolean,
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
