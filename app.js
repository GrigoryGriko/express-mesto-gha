const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');

const { PORT = 3000 } = process.env;

const app = express();


const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

mongoose.connect('mongodb://localhost:27017/mestodb');

/*router.use('/*', (req, res) => {
   /* здесь кидаем статус 404 и записываем message */
//});


app.use((req, res, next) => {
  req.user = {
    _id: '636ba24e5340ce44501d467a'
  };
  
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Сервер работает (порт: ${PORT})`);
})

class NotFoundError extends Error { 
  constructor(message) {
    super(message);
    this.errorCode = 404;
    this.errorMessage = message;
    this.name = 'NotFoundError'; 
   } 
}

module.exports = NotFoundError;

module.export = app;