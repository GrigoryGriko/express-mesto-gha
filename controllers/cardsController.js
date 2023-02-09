/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const {
  CODE_OK,
  CODE_CREATED,
  CODE_BADREQUEST,
  CODE_SERVERERROR,
} = require('../constants/constants');

module.exports.getAllCards = async (req, res, next) => {
  try {
    const card = await Card.find({}).populate(['owner', 'likes']);
    if (card) {
      res.status(CODE_OK).send({ card });
    } else {
      throw new NotFoundError('Карточки не найдены');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    if (card) {
      res.status(CODE_CREATED).send({ card });
    } else {
      throw new NotFoundError('Карточки не найдены');
    }
  } catch (err) {
    if (err.name === 'ValidationError') return next(new CastError('Невалидный ID'));
    next(err);
  }
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
