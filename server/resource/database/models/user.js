const mongoose = require('../connection');

const userSchema = new mongoose.Schema(
  {
    email: String,
    image: String,
    nickname: String,
    password: String,
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
