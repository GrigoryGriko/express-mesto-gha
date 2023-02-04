const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch(() => res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(CODE_CREATED).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CODE_BADREQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError' || req.params.cardId !== req.user._id) return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then((data) => res.status(CODE_OK).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CODE_BADREQUEST).send({ message: 'Невалидный ID' });
      return res.status(CODE_SERVERERROR).send({ message: 'Произошла ошибка' });
    });
};
