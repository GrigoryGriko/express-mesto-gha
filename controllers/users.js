const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserId = (req, res) => {
  User.find({})
    .then(users => {
      if (!users[req.params.id]) {
        res.send({ error: 'Такого пользователя нет' });
      }
      res.send(users[req.params.id]);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}