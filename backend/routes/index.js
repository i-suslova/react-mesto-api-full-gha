const router = require('express').Router();

const rateLimit = require('express-rate-limit');

const errorHandler = require('../middlewares/errorHandler');
const { NotFoundError, RateLimitError } = require('../utils/errors/indexErrors');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');

// ограничения запросов (100 запросов в час)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с вашего IP, пожалуйста, попробуйте позже.',
});

router.use(limiter);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
// используем модуль для аутентификации
router.use('/', authRouter);

router.use((err, req, res, next) => {
  if (err instanceof RateLimitError) {
    errorHandler(err, req, res, next);
  } else {
    next(err);
  }
});

// несуществующий путь
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
