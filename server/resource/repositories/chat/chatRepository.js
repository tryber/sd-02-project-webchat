const {
  service: { getFields },
} = require('../../../utils');

class ChatRepository {
  constructor({ models, data }) {
    this.Chats = models.Chats;
    this.data = data;
  }

  async create() {
    return this.Chats.create(getFields(this.data));
  }

  async find() {
    return this.Chats.find({ _id: this.data.id });
  }

  async listBy(field) {
    return this.Chats.find({ [field]: this.data[field] }).sort({ createdAt: 'asc' });
  }

  async remove() {
    return this.Chats.deleteOne({ _id: this.data.id });
  }

  async update() {
    return this.Chats.findOneAndUpdate({ _id: this.data.id }, getFields(this.data), {
      new: true,
    });
  }
}

module.exports = ChatRepository;
