const Joi = require('@hapi/joi');

const title = Joi.string().required().messages({
  'string.base': 'title must be a type of string',
  'string.empty': 'title is not allowed to be empty',
});

const users = Joi.array().items(Joi.string()).messages({
  'string.base': 'users must be a type of array',
  'string.empty': 'users is not allowed to be empty',
});

const createSchema = Joi.object({
  title,
  users,
}).unknown(false);

const updateSchema = Joi.object({
  title,
}).unknown(false);

module.exports = {
  createSchema,
  updateSchema,
};
