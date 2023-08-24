const { Joi, celebrate } = require('celebrate');

const { urlRegex } = require('../utils/constants');

module.exports.signupValidator = celebrate({

  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
      .messages({
        'string.min': 'Имя должно содержать как минимум 2 символа',
        'string.max': 'Имя не должно превышать 30 символов',
      }),
    about: Joi.string().min(2).max(30).default('Исследователь')
      .messages({
        'string.min': 'Описание должно содержать как минимум 2 символа',
        'string.max': 'Описание не должно превышать 30 символов',
      }),
    avatar: Joi.string()
      .pattern(urlRegex)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .messages({
        'string.pattern.base': 'Некорректная ссылка на аватар',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный формат электронной почты',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
      }),
  })
    .messages({
      'string.min': 'Имя должно содержать как минимум 2 символа',
      'string.max': 'Имя не должно превышать 30 символов',
    }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Некорректный формат электронной почты',
        'any.required': 'Электронная почта обязательна',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
      }),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя должно содержать как минимум 2 символа',
        'string.max': 'Имя не должно превышать 30 символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Описание должно содержать как минимум 2 символа',
        'string.max': 'Описание не должно превышать 30 символов',
      }),
  }),
});

module.exports.avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(urlRegex)
      .messages({
        'string.pattern.base': 'Некорректная ссылка на аватар',
      }),
  }),
});

module.exports.userByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .alphanum()
      .length(24)
      .hex()
      .messages({
        'string.alphanum': 'ID должен содержать только буквенно-цифровые символы',
        'string.length': 'ID должен содержать ровно 24 символа',
        'string.hex': 'ID должен быть в шестнадцатеричном формате',
      }),
  }),
});
