async function create({ data, Model }) {
  const messageModel = new Model(data);

  return messageModel.create();
}

async function find({ id, Model }) {
  const messageModel = new Model({ id });

  const blogPost = await messageModel.find();

  if (!blogPost) return { data: null, error: 'notFound' };

  return { data: blogPost, error: null };
}

async function listBy({ Model, field }) {
  const messageModel = new Model();

  return messageModel.listBy(field);
}

async function remove({ id, Model }) {
  const messageModel = new Model({ id });

  return messageModel.remove();
}

async function search({ name, Model }) {
  const messageModel = new Model();

  const blogPost = await messageModel.findBy(name);

  if (blogPost.length === 0) return { data: null, error: 'notFound' };

  return { data: blogPost, error: null };
}

async function update({ data, id, Model }) {
  const messageModel = new Model({ id, ...data });

  const blogPostExists = await messageModel.find();

  if (!blogPostExists) return { data: null, error: 'notFound' };

  await messageModel.update();

  return { data: await messageModel.find(), error: null };
}

module.exports = {
  create,
  find,
  listBy,
  search,
  remove,
  update,
};
