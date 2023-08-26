import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__list">
          <div
            className="profile__avatar"
            aria-label="аватар пользователя"
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
            }}
          />

          <button
            type="button"
            className="profile__avatar-button"
            aria-label="редактировать "
            onClick={props.onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>

            <button
              type="button"
              className="profile__button-edit hover"
              aria-label="редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-add hover"
          aria-label="добавление фотографий"
          onClick={props.onAddPlace}
        ></button>
      </div>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
