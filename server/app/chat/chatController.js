const Boom = require('@hapi/boom');

const service = require('../serviceController');

const handleError = {
  notFound: () => {
    throw Boom.badRequest('Chat não encontrado');
  },
};

function create({ Chat, chatModel, event }) {
  return async (req, res) => {
    const chat = new Chat({
      ...req.body,
      chatModel,
    });

    const data = await chat.create();

    event.to(data._id).emit('chat', { user: req.user.id, title: data.title });

    res.status(201).json({ chat: data });
  };
}

function find({ Chat, chatModel }) {
  return async (req, res) => {
    const chat = new Chat({ chatModel, id: req.params.id });

    const { data, error } = await chat.find();

    if (error) return handleError[error]();

    res.status(200).json({ chat: data });
  };
}

function listBy({ Chat, chatModel }) {
  return async (req, res) => {
    const { key, value, isPrivate } = req.query;

    const chat = new Chat({ chatModel, key, value, isPrivate: JSON.parse(isPrivate) });

    const data = await chat.listBy();

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
  find,
  listBy,
  remove,
  update,
};
