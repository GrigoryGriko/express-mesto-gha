const User = require('../models/user');
const {
  CODE_OK,
  CODE_BADREQUEST,
  CODE_NOTFOUND,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllUsersController = (req, res) => {
  User.find({})
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserByIdController = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error(`Пользователь с id '${req.params.userId}' не найден`);
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUserController = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении пользователя' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfileController = (req, res) => {
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
      if (err.name === 'Error') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatarController = (req, res) => {
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
      if (err.name === 'Error') return res.status(err.errorCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};
