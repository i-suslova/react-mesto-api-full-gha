import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  //записываем объект, возвращаемый хуком, в переменную
  const editAvatarPopupRef = React.useRef();

  // очищаем поле ввода при открытии формы
  React.useEffect(() => {
    editAvatarPopupRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: editAvatarPopupRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Сохранение..."
    >
      <input
        ref={editAvatarPopupRef}
        type="url"
        name="avatar"
        className="popup__input"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
