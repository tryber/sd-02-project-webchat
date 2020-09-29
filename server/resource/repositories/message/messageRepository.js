class MessageRepository {
  constructor({ models, data = {} }) {
    const { _id, ...Data } = data || {};

    this.Messages = models.Messages;
    this.Data = Data;
    this._id = _id;
  }

  async create() {
    return this.Messages.create(this.Data);
  }

  async listBy(field) {
    return this.Messages.find({ [field]: this.Data[field] }).sort({ createdAt: 'asc' });
  }

  async remove() {
    return this.Messages.deleteOne({ _id: this._id });
  }

  async update() {
    return this.Messages.findOneAndUpdate({ _id: this._id }, this.Data, {
      new: true,
    });
  }
}

module.exports = MessageRepository;
