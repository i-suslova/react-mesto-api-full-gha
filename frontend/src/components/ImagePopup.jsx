import React from "react";

function ImagePopup(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className={`popup popup_image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__button-close popup__button-close_image hover"
          aria-label="закрыть"
          onClick={handleClose}
        ></button>

        <img
          className="popup__image-photo"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__image-text">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
