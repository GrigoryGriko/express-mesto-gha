const router = require('express').Router();

const { getAllCardsController, deleteCardByIdController, likeCard, dislikeCard, createCardController } = require('../controllers/cardsController');

router.post('/', createCardController);
router.get('/', getAllCardsController);
router.delete('/:cardId', deleteCardByIdController);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);




module.exports = router;