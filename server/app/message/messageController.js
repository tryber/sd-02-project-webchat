const Boom = require('@hapi/boom');

const service = require('../serviceController');

const handleError = {
  notFound: () => {
    throw Boom.badRequest('Mensagem não encontrada');
  },
};

function create({ Message, messageModel }) {
  return async (req, res) => {
    const message = new Message({
      ...req.body,
      messageModel,
    });

    const data = await message.create();

    res.status(201).json({ message: data });
  };
}

function listBy({ Message, messageModel }) {
  return async (req, res) => {
    const { key, value } = req.params;

    const message = new Message({ messageModel, [key]: value });

    const { data, error } = await message.listBy(key);

    if (error) return handleError[error]();

    res.status(200).json({ messages: data });
  };
}

function remove({ Message, messageModel }) {
  return service.remove({ Domain: Message, model: messageModel, modelkey: 'messageModel' });
}

function update({ Message, messageModel }) {
  return service.update({
    Domain: Message,
    model: messageModel,
    domainKey: 'message',
    modelkey: 'messageModel',
    handleError,
  });
}

module.exports = {
  create,
  listBy,
  remove,
  update,
};
