const chatService = require('./chatService');

class Message {
  constructor({ chatModel, id, ...data }) {
    this.ChatModel = chatModel;
    this.data = data;
    this.id = id;
  }

  async create() {
    return chatService.create({ data: this.data, Model: this.ChatModel });
  }

  async find() {
    return chatService.find({ id: this.id, Model: this.ChatModel });
  }

  async listByUserId() {
    return chatService.listByUserId({ data: this.data, Model: this.ChatModel });
  }

  async listByUsers() {
    return chatService.listByUsers({ data: this.data, Model: this.ChatModel });
  }
}

module.exports = Message;
