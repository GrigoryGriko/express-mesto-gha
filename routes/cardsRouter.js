const router = require('express').Router();

const { getAllCardsController, deleteCardByIdController, createCardController } = require('..controllers/cardsController');

router.get('/cardss', getAllCardsController);
router.delete('/:cardId', deleteCardByIdController);
router.post('/', createCardController);