const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const {
  login,
  createUser,
} = require('./controllers/usersController');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.post('/signin', login);
app.post('/signup', createUser);
app.post('/usersRouter', auth);

app.use(auth);
app.use(errorHandler);
app.use('/usersRouter', require('./routes/usersRouter'));

app.listen(PORT, () => {
  console.log(`Сервер работает (порт: ${PORT})`);
});

module.exports = app;
