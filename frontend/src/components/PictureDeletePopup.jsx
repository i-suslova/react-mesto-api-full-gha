import React from "react";
import PopupWithForm from "./PopupWithForm";

function PictureDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.deletedCard);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="picture-delete"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Удаляем..."
    ></PopupWithForm>
  );
}

export default PictureDeletePopup;
