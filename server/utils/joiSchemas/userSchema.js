const Joi = require('@hapi/joi');

const email = Joi.string().email().required().messages({
  'any.required': 'email is required',
  'string.base': 'email must be a type of string',
  'string.email': 'email must be in a format <name>@<domain>',
  'string.empty': 'email is not allowed to be empty',
});

const image = Joi.string().messages({
  'string.base': 'Image must be a type of string',
  'string.empty': 'Image is not allowed to be empty',
});

const nickname = Joi.string()
  .regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.]*/)
  .required()
  .messages({
    'any.required': 'nickname is required',
    'string.base': 'nickname must be a type of string',
    'string.pattern.base': 'Nickname in a wrong format',
    'string.empty': 'Nickname is not allowed to be empty',
  });

const nicknameUpdate = Joi.string()
  .regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.]*/)
  .messages({
    'string.base': 'nickname must be a type of string',
    'string.pattern.base': 'Nickname in a wrong format',
    'string.empty': 'Nickname is not allowed to be empty',
  });

const friend = Joi.string().messages({
  'string.base': 'friend must be a type of string',
  'string.empty': 'friend is not allowed to be empty',
});

const password = Joi.string().min(6).required().messages({
  'any.required': 'password is required',
  'string.base': 'password must be a type of string',
  'string.empty': 'password is not allowed to be empty',
  'string.min': 'password length must be at least 6 characters long',
});

const loginSchema = Joi.object({
  email,
  password,
}).unknown(false);

const registerSchema = Joi.object({
  email,
  image,
  nickname,
  password,
}).unknown(false);

const updateSchema = Joi.object({
  friend,
  nickname: nicknameUpdate,
  image,
}).unknown(false);

module.exports = {
  loginSchema,
  registerSchema,
  updateSchema,
};
