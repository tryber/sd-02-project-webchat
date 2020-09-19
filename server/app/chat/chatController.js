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

function listIncludes({ Message, messageModel }) {
  return async (req, res) => {
    const { key, value } = req.params;

    const Messages = new Message({ messageModel, [key]: value });

    const { data, error } = await Messages.listIncludes(key);

    if (error) return handleError[error]();

    res.status(200).json({ Messages: data });
  };
}

function remove({ Message, messageModel }) {
  return service.remove({ Domain: Message, model: messageModel, modelkey: 'messageModel' });
}

function update({ Message, messageModel }) {
  return service.update({
    Domain: Message,
    model: messageModel,
    domainKey: 'Message',
    modelkey: 'messageModel',
    handleError,
  });
}

module.exports = {
  create,
  listIncludes,
  remove,
  update,
};
