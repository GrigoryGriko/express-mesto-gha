const router = require('express').Router();

const { getAllCardsController, deleteCardByIdController, createCardController } = require('../controllers/cardsController');

router.get('/cards', getAllCardsController);
router.delete('/:cardId', deleteCardByIdController);
router.post('/', createCardController);


module.exports = router;