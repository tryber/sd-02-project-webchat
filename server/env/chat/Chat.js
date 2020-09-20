const chatService = require('./chatService');

class Message {
  constructor({ ChatModel, id, ...data }) {
    this.ChatModel = ChatModel;
    this.data = data;
    this.id = id;
  }

  async create() {
    return chatService.create({ data: this.data, Model: this.ChatModel });
  }

  async find() {
    return chatService.find({ id: this.id, Model: this.ChatModel });
  }

  async listBy(field) {
    return chatService.listBy({ field, Model: this.ChatModel });
  }

  async remove() {
    return chatService.remove({ id: this.id, Model: this.ChatModel });
  }

  async update() {
    return chatService.update({ data: this.data, id: this.id, Model: this.ChatModel });
  }
}

module.exports = Message;
