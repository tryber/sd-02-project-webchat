const {
  service: { getFields },
} = require('../../../utils');

class UserRepository {
  constructor({ models, data }) {
    this.Users = models.Users;
    this.data = data;
  }

  async create() {
    return this.Users.create(getFields(this.data));
  }

  async findBy(field) {
    return this.Users.find({ [field]: this.data[field] });
  }

  async list() {
    return this.Users.find({});
  }

  async removeBy(field) {
    return this.Users.deleteOne({ [field]: this.data[field] });
  }

  async updateBy(field) {
    return this.Users.findOneAndUpdate({ [field]: this.data[field] }, getFields(this.data), {
      new: true,
    });
  }
}

module.exports = UserRepository;
