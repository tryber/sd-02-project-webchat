const mongoose = require('../connection');

const messageSchema = new mongoose.Schema(
  {
    createdAt: Date,
    content: String,
    userId: String,
    chatId: String,
  },
  { versionKey: false },
);

module.exports = mongoose.model('message', messageSchema);
