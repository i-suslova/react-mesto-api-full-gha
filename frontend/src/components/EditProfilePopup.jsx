import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm.js";

function EditProfilePopup(props) {
  // Подписка на контекст для хранения данных о текущем пользователе
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    description: "",
  });

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, props.isOpen, setValues]);

  //функция-обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Сохранение..."
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        className="popup__input"
        name="description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.description || ""}
        onChange={handleChange}
      />
      <span className="popup__error input-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
