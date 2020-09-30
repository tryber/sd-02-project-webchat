const {
  service: { getFields },
} = require('../../../utils');

class UserRepository {
  constructor({ models, data }) {
    this.Users = models.Users;
    this.data = data;
  }

  async addFriend() {
    return this.Users.findOneAndUpdate(
      { id: this.data.id },
      { $push: { friends: this.data.friend } },
      {
        new: true,
      },
    );
  }

  async create() {
    return this.Users.create(getFields(this.data));
  }

  async find() {
    return this.Users.find({ _id: this.data.id });
  }

  async findBy(field) {
    return this.Users.find({ [field]: this.data[field] });
  }

  async list() {
    return this.Users.find({});
  }

  async remove() {
    return this.Users.deleteOne({ _id: this.data.id });
  }

  async update() {
    return this.Users.findOneAndUpdate({ _id: this.data.id }, getFields(this.data), {
      new: true,
    });
  }
}

module.exports = UserRepository;
