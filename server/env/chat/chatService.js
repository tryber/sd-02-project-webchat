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

async function listByUserId({ data, Model }) {
  const chatModel = new Model(data);

  const chat = await chatModel.listByUserId();

  if (!chat) return { data: null, error: 'notFound' };

  return { data: chat, error: null };
}

async function listByUsers({ data, Model }) {
  const chatModel = new Model(data);

  const chat = await chatModel.listByUsers();

  if (!chat) return { data: null, error: 'notFound' };

  return { data: chat, error: null };
}

module.exports = {
  create,
  find,
  listByUserId,
  listByUsers,
};
