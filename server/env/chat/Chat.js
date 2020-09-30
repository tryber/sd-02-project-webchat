const chatService = require('./chatService');

class Message {
  constructor({ chatModel, _id, ...data }) {
    this.ChatModel = chatModel;
    this.data = data;
    this._id = _id;
  }

  async create() {
    return chatService.create({ data: this.data, Model: this.ChatModel });
  }

  async find() {
    return chatService.find({ _id: this._id, Model: this.ChatModel });
  }

  async listByUserId() {
    return chatService.listByUserId({ data: this.data, Model: this.ChatModel });
  }

  async listByUsers() {
    return chatService.listByUsers({ data: this.data, Model: this.ChatModel });
  }
}

module.exports = Message;
