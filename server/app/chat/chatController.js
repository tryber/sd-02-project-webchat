const Boom = require('@hapi/boom');

const service = require('../serviceController');

const handleError = {
  notFound: () => {
    throw Boom.badRequest('Chat não encontrado');
  },
};

function create({ Chat, chatModel }) {
  return async (req, res) => {
    const chat = new Chat({
      ...req.body,
      chatModel,
    });

    const data = await chat.create();

    res.status(201).json({ chat: data });
  };
}

function listBy({ Chat, chatModel }) {
  return async (req, res) => {
    const { key, value } = req.params;

    const chat = new Chat({ chatModel, [key]: value });

    const { data, error } = await chat.listBy(key);

    if (error) return handleError[error]();

    res.status(200).json({ chats: data });
  };
}

function remove({ Chat, chatModel }) {
  return service.remove({ Domain: Chat, model: chatModel, modelkey: 'chatModel' });
}

function update({ Chat, chatModel }) {
  return service.update({
    Domain: Chat,
    model: chatModel,
    domainKey: 'chat',
    modelkey: 'chatModel',
    handleError,
  });
}

module.exports = {
  create,
  listBy,
  remove,
  update,
};
