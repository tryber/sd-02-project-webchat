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

  async listBy() {
    return chatService.listBy({ data: this.data, Model: this.ChatModel });
  }

  async remove() {
    return chatService.remove({ id: this.id, Model: this.ChatModel });
  }

  async update() {
    return chatService.update({ data: this.data, id: this.id, Model: this.ChatModel });
  }
}

module.exports = Message;
