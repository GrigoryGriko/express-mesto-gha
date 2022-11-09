const router = require('express').Router();

const { getAllUsersController, getUserByIdController, postUserController } = require('../controllers/usersController');

router.get('/users', getAllUsersController);
router.get('/:userId', getUserByIdController);
router.post('/', postUserController);


module.exports = router;