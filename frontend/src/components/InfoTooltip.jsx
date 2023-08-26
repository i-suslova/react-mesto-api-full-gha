import iconConsent from "../images/iconConsent.svg";
import iconRefusal from "../images/iconRefusal.svg";

function InfoTooltip(props) {
  if (!props.isOpen) {
    return null;
  }

  let iconImage;
  let message;
  if (props.isStatus) {
    iconImage = iconConsent;
    message = "Вы успешно зарегистрировались!";
  } else {
    iconImage = iconRefusal;
    message = "Что-то пошло не так! Попробуйте ещё раз.";
  }

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__button-close popup__button-close_${props.name} hover`}
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>

        <div>
          <img src={iconImage} alt={message} className="popup__icon" />
          <h3 className="popup__result-title">{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
