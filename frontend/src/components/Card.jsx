import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  //const isOwn = card.owner._id === currentUser._id;
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__button-delete ${
    isOwn ? "hover" : ""
  }`;

  const handleClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  //Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_activ" : ""
  }`;

  return (
    <article className="element" key={props.card._id}>
      <img
        src={props.card.link}
        alt={`${props.card.name}.`}
        className="element__photo"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="удалить"
          onClick={handleDeleteClick}
        ></button>
      )}

      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button
          type="button"
          className={cardLikeButtonClassName}
          aria-label="нравится"
          onClick={handleLikeClick}
        ></button>
        <span className="element__number-like">{props.card.likes.length}</span>
      </div>
    </article>
  );
}

export default Card;
