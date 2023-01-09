const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', getAllUsers);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserById);

module.exports = router;
