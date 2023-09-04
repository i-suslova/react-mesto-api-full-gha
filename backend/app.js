require('dotenv').config();
// const dot = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/mestodb';
// dot.config();

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  });

const app = express();
app.use(cors());
// для собирания JSON-формата
app.use(express.json());
// для обработки данных, отправленных через формы HTML
app.use(express.urlencoded({ extended: true }));
// подключаем логгер запросов
app.use(requestLogger);
// подключаем роуты
app.use(routes);
// подключаем логгер ошибок
app.use(errorLogger);
// обработчики ошибок 'celebrate'
app.use(errors());
// централизованная обработка ошибок
app.use(errorHandler);

// запускаем сервер
app.listen(PORT);
