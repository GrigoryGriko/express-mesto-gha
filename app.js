const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const {
  login,
  createUser
} = require('./controllers/usersController');
const { CODE_NOTFOUND } = require('./constants/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(CODE_NOTFOUND).send({ message: 'Данный ресурс не найден' });
});

app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`Сервер работает (порт: ${PORT})`);
});

module.exports = app;
