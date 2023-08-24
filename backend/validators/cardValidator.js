const { Joi, celebrate } = require('celebrate');

const { urlRegex } = require('../utils/constants');

module.exports.createCarddValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Название должно содержать как минимум 2 символа',
        'string.max': 'Название не должно превышать 30 символов',
        'any.required': 'Название обязательно',
      }),
    link: Joi.string().required()
      .pattern(urlRegex)
      .messages({
        'string.pattern.base': 'Некорректная ссылка',
        'any.required': 'Ссылка обязательна',
      }),
  }),
});

module.exports.deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.alphanum': 'ID должен содержать только буквенно-цифровые символы',
        'string.length': 'ID должен содержать ровно 24 символа',
        'string.hex': 'ID должен быть в шестнадцатеричном формате',
      }),
  }),
});

module.exports.likeDislikeValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.alphanum': 'ID должен содержать только буквенно-цифровые символы',
        'string.length': 'ID должен содержать ровно 24 символа',
        'string.hex': 'ID должен быть в шестнадцатеричном формате',
      }),
  }),
});
