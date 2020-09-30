const Boom = require('@hapi/boom');

const handleError = {
  notFound: () => {
    throw Boom.badRequest('Mensagem não encontrada');
  },
};

function create({ Message, messageModel, event }) {
  return async (req, res) => {
    const message = new Message({
      ...req.body,
      userId: req.user._id,
      nickname: req.user.nickname,
      messageModel,
    });

    const data = await message.create();

    event.emit('message', {
      user: req.user.nickname,
      content: data.content,
      chatTitle: data.chatTitle,
      chatId: data.chatId,
    });

    res.status(201).json(data);
  };
}

function listBy({ Message, messageModel }) {
  return async (req, res) => {
    const { key, value } = req.query;

    const message = new Message({ messageModel, [key]: value });

    const { data, error } = await message.listBy(key);

    if (error) return handleError[error]();

    res.status(200).json(data);
  };
}

module.exports = {
  create,
  listBy,
};
