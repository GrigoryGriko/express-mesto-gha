const router = require('express').Router();

const {
  getAllCards,
  deleteCardById,
  likeCard,
  dislikeCard,
  createCard,
} = require('../controllers/cardsController');

router.post('/', createCard);
router.get('/', getAllCards);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
