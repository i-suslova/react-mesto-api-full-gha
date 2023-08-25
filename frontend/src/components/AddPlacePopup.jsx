import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm.js";

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
  });

  //очищаем форму при открытии попапа добавления нового места
  React.useEffect(() => {
    //сбрасываем значения с помощью функции setValues из userform
    setValues({
      name: "",
      link: "",
    });
  }, [props.isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    //получаем значения из объекта values
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="picture"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Сохранение..."
    >
      <input
        type="text"
        className="popup__input"
        id="input-picture"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__error input-picture-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input"
        id="input-link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
