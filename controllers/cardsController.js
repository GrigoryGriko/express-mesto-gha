const Card = require('../models/card');
const NotFoundError = require('../NotFoundError');

module.exports.getAllCardsController = (req, res) => {
  Card.find({})
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при получении карточки' });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.createCardController = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id})
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      else  return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.deleteCardByIdController = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError(`Карточка с id '${req.params.cardId}' не найдена`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Карточка с указанным _id не найдена' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.likeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточки не найдены`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.dislikeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточки не найдены`))
    .then(data => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      else if (err.name === 'NotFoundError') return res.status(err.errorCode).send({ message: err.errorMessage });
      else return res.status(500).send({ message: 'Произошла ошибка' });
    });
}