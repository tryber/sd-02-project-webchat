const mongoose = require('../connection');

const messageSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: new Date() },
    content: String,
    userId: String,
    nickname: String,
    chatId: String,
    chatTitle: String,
  },
  { versionKey: false },
);

module.exports = mongoose.model('message', messageSchema);
