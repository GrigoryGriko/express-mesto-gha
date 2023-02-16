/* eslint-disable consistent-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const FordibbenError = require('../errors/FordibbenError');
const {
  CODE_OK,
  CODE_CREATED,
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
    if (err.name === 'ValidationError') return next(new CastError('Ошибка валидации'));
    next(err);
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      if (req.user._id.toString() !== card.owner.toString()) {
        console.log(`a1- ${req.user._id}`);
        console.log(`a2- ${card.owner}`);
        throw new FordibbenError('Запрещено удалять чужую карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(
          res.status(CODE_OK).send({ card }),
        );
    } else {
      throw new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      res.status(CODE_OK).send({ card });
    } else {
      throw new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      res.status(CODE_OK).send({ card });
    } else {
      throw new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};
