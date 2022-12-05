const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  createUser,
} = require('../controllers/usersController');

router.post('/', createUser);
router.get('/', getAllUsers);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserById);

module.exports = router;
