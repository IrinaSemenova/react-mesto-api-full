require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./error/not-found-error');
const { linkValidate } = require('./utils/link-validate');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
const options = {
  origin: [
    'http://domainfrontmesto.students.nomoredomains.sbs',
    'https://domainfrontmesto.students.nomoredomains.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(options));

app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkValidate),
  }),
}), createUser);

app.get('/signout', (req, res) => {
  res.clearCookie('authorization').send({ message: 'Выход' });
});

app.use(auth);
app.use(routerUsers);
app.use(routerCards);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчики ошибок

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
