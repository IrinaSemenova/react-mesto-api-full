const router = require('express').Router();
const { createCardValidate, cardIdValidate } = require('../middlewares/validator');

const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);
router.post('/cards', createCardValidate, createCard);
router.delete('/cards/:cardId', cardIdValidate, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidate, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;
