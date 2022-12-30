const User = require('../models/user');
const NotFoundError = require('../NotFoundError');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch(() => res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) return res.status(CODE_BADREQUEST).send({ message: 'Email или пароль не могут быть пустыми'});

  bcrypt.hash(password, 12)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((data) => res.status(CODE_CREATED).send({ 
          data: {
            name, about, avatar, email,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении пользователя'});
          return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
          next(err);
        });
    }).catch(next);
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },

    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },

    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};
