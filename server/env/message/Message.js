const MessageService = require('./messageService');

class Message {
  constructor({ MessageModel, id, ...data }) {
    this.MessageModel = MessageModel;
    this.data = data;
    this.id = id;
  }

  async create() {
    return MessageService.create({ data: this.data, Model: this.MessageModel });
  }

  async find() {
    return MessageService.find({ id: this.id, Model: this.MessageModel });
  }

  async listBy(field) {
    return MessageService.listBy({ field, Model: this.MessageModel });
  }

  async remove() {
    return MessageService.remove({ id: this.id, Model: this.MessageModel });
  }

  async update() {
    return MessageService.update({ data: this.data, id: this.id, Model: this.MessageModel });
  }
}

module.exports = Message;
