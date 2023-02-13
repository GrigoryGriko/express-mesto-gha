const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const {
  validateUserLogin,
  validateUserRegister,
} = require('./middlewares/validation');
const {
  login,
  createUser,
} = require('./controllers/usersController');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserRegister, createUser);

app.post('/usersRouter', auth);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/usersRouter', require('./routes/usersRouter'));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер работает (порт: ${PORT})`);
});

module.exports = app;
