const mongoose = require('../connection');

const chatSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: new Date() },
    title: String,
    userId: String,
    isPrivate: Boolean,
    users: [String],
  },
  { versionKey: false },
);

module.exports = mongoose.model('chat', chatSchema);
