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

async function listBy({ data, Model }) {
  let value;

  if (data.key === 'users') {
    value = data.value.split(',');
  }

  const chatModel = new Model({ [data.key]: value || data.value, isPrivate: data.isPrivate });

  return chatModel.listBy(data.key);
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
