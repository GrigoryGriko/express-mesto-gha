/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const {
  CODE_OK,
  CODE_CREATED,
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

module.exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(CODE_OK).send({ user });
    } else {
      throw new NotFoundError(`Пользователь с id '${req.user._id}' не найден`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },

      {
        new: true,
        runValidators: true,
      },
    );
    if (user) {
      res.status(CODE_OK).send({ user });
    } else {
      throw new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') return next(new CastError('Переданы некорректные данные при обновлении профиля'));
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },

      {
        new: true,
        runValidators: true,
      },
    );

    if (user) {
      res.status(CODE_OK).send({ user });
    } else {
      throw new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') return next(new CastError('Переданы некорректные данные при обновлении профиля'));
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new NotFoundError('Неправильные почта или пароль');
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new NotFoundError('Неправильные почта или пароль');
      } else {
        const token = jwt.sign(
          { _id: user._id },
          'pro-letter-crypto',
          { expiresIn: 3600 },
        );

        res
          .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          });

        res.status(CODE_OK).send({ user });
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные'));
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) return next(new CastError('Не все поля заполнены'));

  try {
    const hash = await bcrypt.hash(password, 12);
    if (hash) {
      const { password: _, ...user } = await User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });

      if (user) {
        res.status(CODE_CREATED).send({ user });
      } else {
        throw new NotFoundError('Пользователи не найдены');
      }
    }
  } catch (err) {
    if (err.code === 11000) return next(new ConflictingRequestError('Данный email уже существует'));
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные'));
    next(err);
  }
};
