require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADDRESS } = process.env;
mongoose
  .connect(DB_ADDRESS, {
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
