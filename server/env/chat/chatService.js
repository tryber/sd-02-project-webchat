async function create({ data, Model }) {
  const chatModel = new Model(data);

  return chatModel.create();
}

async function find({ id, Model }) {
  const chatModel = new Model({ id });

  const chat = await chatModel.find();

  if (!chat) return { data: null, error: 'notFound' };

  return { data: chat, error: null };
}

async function listBy({ field, Model }) {
  const chatModel = new Model();

  const chat = chatModel.listBy(field);

  if (chat.length === 0) return { data: null, error: 'notFound' };

  return { data: chat, error: null };
}

async function remove({ id, Model }) {
  const chatModel = new Model({ id });

  return chatModel.remove();
}

async function update({ data, id, Model }) {
  const chatModel = new Model({ id, ...data });

  const chat = await chatModel.update();

  if (!chat) return { data: null, error: 'notFound' };

  return { data: chat, error: null };
}

module.exports = {
  create,
  find,
  listBy,
  remove,
  update,
};
