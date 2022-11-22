const User = require('../models/user');


module.exports.getAllUsersController = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserByIdController = (req, res) => {
  User.find({})
    .then(users => {
      if (!users[req.params.id]) {
        res.send({ error: 'Такого пользователя нет' });
      }
      res.send(users[req.params.id]);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports.createUserController = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateAvatarController = (req, res) => {
  const avatar = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar},

    { 
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
