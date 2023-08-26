const router = require('express').Router();
const { authUser } = require('../middlewares/auth');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCarddValidator,
  deleteCardValidator,
  likeDislikeValidator,
} = require('../validators/cardValidator');

// Роут для возврата всех карточек
router.get('/', authUser, getAllCards);

// Роут для создания карточек
router.post('/', authUser, createCarddValidator, createCard);

// Роут для удаления карточки по идентификатору
router.delete('/:cardId', authUser, deleteCardValidator, deleteCard);

// Роут для постановки лайка карточке
router.put('/:cardId/likes', authUser, likeDislikeValidator, likeCard);

// Роут для удаления лайка с карточки
router.delete('/:cardId/likes', authUser, likeDislikeValidator, dislikeCard);

module.exports = router;
