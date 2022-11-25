const User = require('../models/user');
const NotFoundError = require('../app');

module.exports.getAllUsersController = (req, res) => {
  User.find({})
    .orFail(new NotFoundError(`Пользователи не найдены`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.getUserByIdController = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId )
    .orFail(new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.createUserController = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      else  return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.updateProfileController = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { 
      name: name,
      about: about
    },

    { 
      new: true,
      runValidators: true
    }
  )
  .orFail(new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.updateAvatarController = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },

    { 
      new: true,
      runValidators: true
    }
  )
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}
