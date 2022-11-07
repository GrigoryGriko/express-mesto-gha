const router = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controlles/users');

router.get('/users', getUsers)
router.get('/users/:userId', getUserId);
router.post('/users', createUser);

module.esports = router;