import React, { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  //обработчик `Escape`
  useEffect(() => {
    //контролируем обработчик: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    //объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    //удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener("keydown", closeByEscape);
    //контролируем `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  //обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__button-close popup__button-close_${name} hover`}
          aria-label="закрыть"
          onClick={onClose}
        ></button>

        <div className="popup__image-container">{children}</div>
      </div>
    </div>
  );
};
export default Popup;
