const { bcrypt, jsonWebToken } = require('../../utils');

async function addFriend({ data, id, Model }) {
  const userModel = new Model({ id, ...data });

  const userExists = await userModel.find();

  if (!userExists) return { data: null, error: 'notFound' };

  const user = await userModel.addFriend();

  const { password, ...userWithoutPassword } = user.toObject();

  return { data: userWithoutPassword, error: null };
}

async function create({ data, Model }) {
  const hash = await bcrypt.createHash(data.password);

  const userModel = new Model({ ...data, password: hash });

  const existEmail = await userModel.findBy('email');

  if (existEmail.length !== 0) return { data: null, token: null, error: 'existsEmail' };

  const existNickname = await userModel.findBy('nickname');

  if (existNickname.length !== 0) return { data: null, token: null, error: 'existsNickname' };

  const user = await userModel.create();

  const { password, ...userWithoutPassword } = user.toObject();

  const token = jsonWebToken.signToken(userWithoutPassword);

  return { data: userWithoutPassword, token, error: null };
}

async function find({ id, Model }) {
  const userModel = new Model({ id });

  const user = await userModel.find();

  if (!user) return { data: null, error: 'notFound' };

  const { password, ...userWithoutPassword } = user[0].toObject();

  return { data: userWithoutPassword, error: null };
}

async function list({ Model }) {
  const userModel = new Model();

  const users = await userModel.list();

  return users.map((eachUser) => {
    const { password, ...userWithoutPassword } = eachUser.toObject();

    return userWithoutPassword;
  });
}

async function login({ email, password, Model }) {
  const userModel = new Model({ email, password });

  const user = await userModel.findBy('email');

  if (user.length === 0) return { data: null, token: null, error: 'notFound' };

  const { password: userPassword, ...userWithoutPassword } = user[0].toObject();

  const isCorrectPassword = await bcrypt.checkString({
    string: password,
    hash: userPassword,
  });

  if (!isCorrectPassword && password !== userPassword) {
    return { data: null, token: null, error: 'wrongPassword' };
  }

  const token = jsonWebToken.signToken(userWithoutPassword);

  return { data: userWithoutPassword, token, error: null };
}

async function remove({ id, Model }) {
  const userModel = new Model({ id });

  return userModel.remove();
}

async function update({ data, id, Model }) {
  const userModel = new Model({ id, ...data });

  const userExists = await userModel.find();

  if (!userExists) return { data: null, error: 'notFound' };

  const user = await userModel.update();

  const { password, ...userWithoutPassword } = user.toObject();

  return { data: userWithoutPassword, error: null };
}

module.exports = {
  addFriend,
  create,
  find,
  list,
  login,
  remove,
  update,
};
