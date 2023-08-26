import React from "react";
import Popup from "./Popup";

function PopupWithForm(props) {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <form
        className="popup__form"
        name={`form-${props.name}`}
        method="post"
        onSubmit={props.onSubmit}
      >
        <h2 className="popup__title">{props.title}</h2>

        {props.children}

        <button
          type="submit"
          className="popup__button"
          disabled={props.isLoading}
        >
          {props.isLoading ? props.loadingButtonText : props.buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
