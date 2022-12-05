const Card = require('../models/card');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_NOTFOUND,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllCardsController = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при получении карточки' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCardController = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(CODE_CREATED).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardByIdController = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: err.name });
    });
};

module.exports.likeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Нет карточки по заданному id');
      error.statusCode = CODE_NOTFOUND;
      throw error;
    })
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      if (err.name === 'Error') return res.status(err.statusCode).send({ message: err.message });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};
