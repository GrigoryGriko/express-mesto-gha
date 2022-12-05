const User = require('../models/user');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_NOTFOUND,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении пользователя' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error(`Пользователь с id '${req.params.userId}' не найден`);
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.status(CODE_CREATED).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении пользователя' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { Name, About } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: Name,
      about: About,
    },

    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error(`Пользователь с id '${req.params.userId}' не найден`);
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { Avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: Avatar },

    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error(`Пользователь с id '${req.params.userId}' не найден`);
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};
