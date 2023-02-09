const router = require('express').Router();

const {
  validateCardBody,
  validateCardId,
} = require('../middlewares/validation');

const {
  getAllCards,
  deleteCardById,
  likeCard,
  dislikeCard,
  createCard,
} = require('../controllers/cardsController');

router.post('/', validateCardBody, createCard);
router.get('/', getAllCards);
router.delete('/:cardId', validateCardId, deleteCardById);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
