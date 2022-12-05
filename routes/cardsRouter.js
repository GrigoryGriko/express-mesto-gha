const router = require('express').Router();

const {
  getAllCardsController,
  deleteCardByIdController,
  likeCardController,
  dislikeCardController,
  createCardController,
} = require('../controllers/cardsController');

router.post('/', createCardController);
router.get('/', getAllCardsController);
router.delete('/:cardId', deleteCardByIdController);
router.put('/:cardId/likes', likeCardController);
router.delete('/:cardId/likes', dislikeCardController);

module.exports = router;
