const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { signupValidator, loginValidator } = require('../validators/userValidator');

// роут для регистрации пользователя
router.post('/signup', signupValidator, createUser);

// роут для аутентификации
router.post('/signin', loginValidator, login);

module.exports = router;
