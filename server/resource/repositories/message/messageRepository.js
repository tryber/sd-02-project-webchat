const {
  service: { getFields },
} = require('../../../utils');

class MessageRepository {
  constructor({ models, data }) {
    this.Messages = models.Messages;
    this.data = data;
  }

  async create() {
    return this.Messages.create(getFields(this.data));
  }

  async find() {
    return this.Messages.find({ _id: this.data.id });
  }

  async findBy(field) {
    return this.Messages.find({ [field]: this.data[field] });
  }

  async listBy(field) {
    return this.Messages.find({ [field]: this.data[field] }).sort({ createdAt: 'asc' });
  }

  async remove() {
    return this.Messages.deleteOne({ _id: this.data.id });
  }

  async update() {
    return this.Messages.findOneAndUpdate({ _id: this.data.id }, getFields(this.data), {
      new: true,
    });
  }
}

module.exports = MessageRepository;
