const router = require('express').Router();
const {
  validateUserId,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

const {
  getAllUsers,
  getUserById,
  getUserData,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', getAllUsers);
router.get('/me', getUserData);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;
