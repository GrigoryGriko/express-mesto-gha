const router = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const errorHandler = require('../middlewares/errorHandler');
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  validateUserLogin,
  validateUserRegister,
} = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/usersController');

router.use(cookieParser());
router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserRegister, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use((req, res, next) => {
  next(new NotFoundError('Данный ресурс не найден'));
});
router.use(errors());
router.use(errorHandler);

module.exports = router;

