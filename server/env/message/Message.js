const messageService = require('./messageService');

class Message {
  constructor({ messageModel, id, ...data }) {
    this.MessageModel = messageModel;
    this.data = data;
    this.id = id;
  }

  async create() {
    return messageService.create({ data: this.data, Model: this.MessageModel });
  }

  async listBy(field) {
    return messageService.listBy({ field, Model: this.MessageModel, data: this.data });
  }

  async remove() {
    return messageService.remove({ id: this.id, Model: this.MessageModel });
  }

  async update() {
    return messageService.update({ data: this.data, id: this.id, Model: this.MessageModel });
  }
}

module.exports = Message;
