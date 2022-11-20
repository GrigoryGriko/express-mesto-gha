const Card = require('../models/card');


module.exports.getAllCardsController = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createCardController = (req, res) => {
  const { name, link } = req.body;

  console.dir(req.user);

  Card.create({ name, link, owner: req.user._id})
    .then(card => res.send({ data: card }))
    .catch((err) => {
      console.dir(err);
      res.status(500).send({ message: 'Произошла ошибка' })
    });
}

module.exports.deleteCardByIdController = (req, res) => {
  Card.remove({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}