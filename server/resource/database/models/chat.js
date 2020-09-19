const mongoose = require('../connection');

const chatSchema = new mongoose.Schema(
  {
    createdAt: Date,
    title: String,
    userId: String,
    users: [String],
  },
  { versionKey: false },
);

module.exports = mongoose.model('chat', chatSchema);
