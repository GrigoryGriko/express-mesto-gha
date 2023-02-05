const {celebrate, Joi} = require("celebrate");
const validator = require("validator");

const validateRegisterBody = celebrate{(
  body: {
    password: Joi.string().min(2).max(30).required().message({
      'string.min' : 'Минимальная длинна поля 2 символа',
      'string.max' : 'Максимальная длинна поля 30 символов',
      'any.required' : 'Обязательое поле'
    }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    }).messages({
      'any.required' : 'Обязательное поле'
    }),
  }
)}
