const router = require('express').Router();

const {
  getAllUsersController,
  getUserByIdController,
  updateProfileController,
  updateAvatarController,
  createUserController,
} = require('../controllers/usersController');

router.post('/', createUserController);
router.get('/', getAllUsersController);
router.patch('/me', updateProfileController);
router.patch('/me/avatar', updateAvatarController);
router.get('/:userId', getUserByIdController);

module.exports = router;
