const Boom = require('@hapi/boom');

const service = require('../serviceController');

const handleError = {
  existsEmail: () => {
    throw Boom.badRequest('Já existe um usuário com este email');
  },
  existsNickname: () => {
    throw Boom.badRequest('Já existe um usuário com este nickname');
  },
  notFound: () => {
    throw Boom.badRequest('Usuário não encontrado');
  },
  wrongPassword: () => {
    throw Boom.badRequest('Senha incorreta');
  },
};

function addFriend({ User, userModel }) {
  return async (req, res) => {
    const user = new User({
      friend: req.body.friend,
      userModel,
      id: req.params.id,
    });

    const { data, error } = await user.addFriend();

    if (error) return handleError[error]();

    res.status(200).json({ user: data });
  };
}

function create({ User, userModel }) {
  return async (req, res) => {
    const user = new User({
      ...req.body,
      userModel,
    });

    const { data, token, error } = await user.create();

    if (error) return handleError[error]();

    res.status(201).json({ user: data, token });
  };
}

function find({ User, userModel }) {
  return async (req, res) => {
    const user = new User({ userModel, id: req.params.id });

    const { data, error } = await user.find();

    if (error) return handleError[error]();

    res.status(200).json({ user: data });
  };
}

function list({ User, userModel }) {
  return async (_req, res) => {
    const users = new User({ userModel });

    const data = await users.list();

    res.status(200).json({ users: data });
  };
}

function login({ User, userModel }) {
  return async (req, res) => {
    const user = new User({ userModel, ...req.body });

    const { data, token, error } = await user.login();

    if (error) return handleError[error]();

    res.status(200).json({ user: data, token });
  };
}

function remove({ User, userModel }) {
  return service.remove({ Domain: User, model: userModel, modelkey: 'userModel' });
}

function update({ User, userModel, event }) {
  return async (req, res) => {
    const user = new User({ userModel, ...req.body, id: req.params.id });

    const { data, error } = await user.update();

    if (error) return handleError[error]();

    event.emit('update');

    res.status(200).json({ user: data });
  };
}

function validateToken(req, res) {
  const { password, ...user } = req.user.toObject();

  return res.status(200).json(user);
}

module.exports = {
  addFriend,
  create,
  find,
  list,
  login,
  remove,
  update,
  validateToken,
};
