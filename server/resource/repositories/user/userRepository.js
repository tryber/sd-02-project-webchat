class UserRepository {
  constructor({ models, data }) {
    const { _id, ...Data } = data || {};

    this.Users = models.Users;
    this.Data = Data;
    this._id = _id;
  }

  async create() {
    return this.Users.create(this.Data);
  }

  async find() {
    return this.Users.find({ _id: this._id });
  }

  async findBy(field) {
    return this.Users.find({ [field]: this.Data[field] });
  }

  async list() {
    return this.Users.find({});
  }

  async remove() {
    return this.Users.deleteOne({ _id: this._id });
  }

  async update() {
    return this.Users.findOneAndUpdate({ _id: this._id }, this.Data, {
      new: true,
    });
  }
}

module.exports = UserRepository;
