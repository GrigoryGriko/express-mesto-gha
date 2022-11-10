const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');

const { PORT = 3000 } = process.env;

const app = express();


const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '636ba24e5340ce44501d467a'
  };

  next();
}); 
  
app.listen(PORT, () => {
    console.log(`Сервер работает (порт: ${PORT})`);
})

module.export = app;