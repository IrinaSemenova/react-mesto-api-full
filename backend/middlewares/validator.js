const { celebrate, Joi } = require('celebrate');
const { linkValidate } = require('../utils/link-validate');

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkValidate),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkValidate),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkValidate),
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  userIdValidate,
  updateUserValidate,
  updateAvatarValidate,
  createCardValidate,
  cardIdValidate,
};
