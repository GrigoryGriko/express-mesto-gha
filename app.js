const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Сервер работает (порт: ${PORT})`);
})

module.export = app;