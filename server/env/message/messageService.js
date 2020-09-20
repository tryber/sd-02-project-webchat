async function create({ data, Model }) {
  const messageModel = new Model(data);

  return messageModel.create();
}

async function listBy({ Model, field }) {
  const messageModel = new Model();

  const message = messageModel.listBy(field);

  if (message.length === 0) return { data: null, error: 'notFound' };

  return { data: message, error: null };
}

async function remove({ id, Model }) {
  const messageModel = new Model({ id });

  return messageModel.remove();
}

async function update({ data, id, Model }) {
  const messageModel = new Model({ id, ...data });

  const message = await messageModel.update();

  if (!message) return { data: null, error: 'notFound' };

  return { data: message, error: null };
}

module.exports = {
  create,
  listBy,
  remove,
  update,
};
