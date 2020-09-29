const mongoose = require('../connection');

const chatSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: new Date() },
    isPrivate: Boolean,
    owner: String,
    title: String,
    users: [String],
  },
  { versionKey: false },
);

module.exports = mongoose.model('chat', chatSchema);
