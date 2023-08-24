const mongoose = require('mongoose');
const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors/indexErrors');

const CREATED_CODE = 201;

// получаем список карточек
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаем карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_CODE).send(card))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
};

// удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError('Не найдена карточка с указанным _id.'))
    .then((card) => {
      if (card && card.owner.equals(userId)) {
        return Card.deleteOne({ _id: cardId })
          .then(() => res.send({ message: 'Карточка успешно удалена' }))
          .catch(next);
      }
      throw new ForbiddenError('У Вас нет прав для удаления этой карточки.');
    })
    .catch(next);
};

// ставим лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // добавить _id в массив, если его там нет
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Такой карточки нет.');
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Недопустимый формат данных.'));
      } else {
        next(err);
      }
    });
};

// удаляем лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // убрать _id из массива
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Такой карточки нет.');
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Недопустимый формат данных.'));
      } else {
        next(err);
      }
    });
};
