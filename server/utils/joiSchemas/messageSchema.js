const Joi = require('@hapi/joi');

const chatId = Joi.string().required().messages({
  'string.base': 'chatId must be a type of string',
  'string.empty': 'chatId is not allowed to be empty',
});

const content = Joi.string().required().messages({
  'string.base': 'content must be a type of string',
  'string.empty': 'content is not allowed to be empty',
});

const chatTitle = Joi.string().required().messages({
  'string.base': 'chatTitle must be a type of string',
  'string.empty': 'chatTitle is not allowed to be empty',
});

const contentUpdate = Joi.string().messages({
  'string.base': 'content must be a type of string',
  'string.empty': 'content is not allowed to be empty',
});

const createSchema = Joi.object({
  chatId,
  chatTitle,
  content,
}).unknown(false);

const updateSchema = Joi.object({
  content: contentUpdate,
}).unknown(false);

module.exports = {
  createSchema,
  updateSchema,
};
