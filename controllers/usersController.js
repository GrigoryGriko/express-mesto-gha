/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    if (user) {
      res.status(CODE_OK).send({ user });
    } else {
      throw new NotFoundError('Пользователи не найдены');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(CODE_OK).send({ user });
    } else {
      throw new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};

module.exports.getUserData = (req, res) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
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
    .orFail(new NotFoundError(`Пользователь с id '${req.params.cardId}' не найден`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
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
    .orFail(new NotFoundError(`Пользователь с id '${req.params.cardId}' не найден`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new NotFoundError('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: User._id },
        'pro-letter-crypto',
        { expiresIn: 3600 },
      );

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) return res.status(CODE_BADREQUEST).send({ message: 'Email или пароль не могут быть пустыми' });

  bcrypt.hash(password, 12)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((data) => res.status(CODE_CREATED).send({ data }))
        .catch((err) => {
          if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении пользователя' });
          return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
        });
    });
};
