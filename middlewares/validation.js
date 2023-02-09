const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUserId = celebrate({
  params: {
    userId: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна id пользователя - 2',
        'string.max': 'Максимальная длинна id пользователя - 30',
        'any.required': 'Id пользователя не указан',
      }),
  },
});

const validateProfile = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля name - 2',
        'string.max': 'Максимальная длинна поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля about - 2',
        'string.max': 'Максимальная длинна поля about - 30',
        'any.required': 'Поле about должно быть заполнено',
      }),
  },
});

const validateUserBody = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна пароля 2 символа',
        'string.max': 'Максимальная длинна пароля 30 символов',
        'any.required': 'Пароль должен быть заполнен',
      }),
  },
});

const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный url');
    })
      .messages({
        'any.required': 'Поле url должно быть заполнено',
      }),
  },
});

const validateCardBody = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля name - 2',
        'string.max': 'Максимальная длинна поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный url');
    })
      .messages({
        'any.required': 'Поле url должно быть заполнено',
      }),
  },
});

const validateCardId = celebrate({
  params: {
    cardId: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна id карточки - 2',
        'string.max': 'Максимальная длинна id карточки - 30',
        'any.required': 'Id карточки не указан',
      }),
  },
});

module.exports = {
  validateCardId,
  validateCardBody,
  validateUserId,
  validateUserBody,
  validateProfile,
  validateAvatar,
};
