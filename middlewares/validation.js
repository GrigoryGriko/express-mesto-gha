const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegisterBody = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля 2 символа',
        'string.max': 'Максимальная длинна поля 30 символов',
        'any.required': 'Обязательное поле',
      }),
  },
});
const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s]$/),
  },
});

module.exports = {
  validateRegisterBody,
  validateAvatar,
};
