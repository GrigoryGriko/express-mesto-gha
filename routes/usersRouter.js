const router = require('express').Router();

const { getAllUsersController, getUserByIdController, createUserController } = require('../controllers/usersController');

router.get('/users', getAllUsersController);
router.get('/:userId', getUserByIdController);
router.post('/', createUserController);


module.exports = router;