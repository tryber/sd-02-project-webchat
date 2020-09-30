class MessageRepository {
  constructor({ models, data = {} }) {
    const { _id, ...Data } = data || {};
    const { Messages, ...Models } = models;

    this.Models = Models;
    this.Messages = Messages;
    this.Data = Data;
    this._id = _id;
  }

  async create() {
    const Chat = await this.Messages.create(this.Data);

    const { chatId, ...message } = Chat.toObject();

    const chat = await this.Models.Chats.find({ _id: chatId });

    return { ...message, chat };
  }

  async listBy(field) {
    return this.Messages.find({ [field]: this.Data[field] }).sort({ createdAt: 'asc' });
  }
}

module.exports = MessageRepository;
