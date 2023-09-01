import React from "react";
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";
import apiAuth from "../utils/apiAuth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PictureDeletePopup from "./PictureDeletePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  //определяем, открыт ли попап для редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //определяем, открыт ли попап для добавления нового места
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //определяем, открыт ли попап для редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //определяем, открыт ли попап для Подтверждения удаления карточки
  const [isPictureDeletePopupOpen, setIsPictureDeletePopupOpen] =
    useState(false);
  //определяем, открыт ли попап информации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  //данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //сохраняем информации о карточке, которая должна быть удалена
  const [deletedCard, setDeletedCard] = useState(null);
  //сохраняем информацию о выбранной карточке
  const [selectedCard, setSelectedCard] = useState(null);
  //сохраняем массив карточек
  const [cards, setCards] = useState([]);
  //сохраняем электронную почту
  const [userEmail, setUserEmail] = useState("");
  //отслеживанияем статус загрузки
  const [isLoading, setIsLoading] = useState(false);
  //отслеживанем успешное завершенияе регистрации
  const [isRegistrationStatus, setIsRegistrationStatus] = useState(false);
  //отслеживанем данные входа
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //отслеживаем авторизацию
  const [tokenChecked, setTokenChecked] = useState(false);

  const getAllData = async (setAuthorization) => {
    try {
      setAuthorization(localStorage.getItem("JWT"));
      const { userData, cardData } = await api.getAllNeedData();
      setCurrentUser(userData);
      setCards(cardData.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  
  React.useEffect(() => {
    if (!isLoggedIn) return;
    const setAuthorization = (token) => {
      api.setAuthorization(token);
    };
  
    getAllData(setAuthorization);
  }, [isLoggedIn]);
  
  const handleRegister = (email, password) => {
    apiAuth
      .signup({ email, password })
      .then((res) => {
        setUserEmail(res.email);
        setIsRegistrationStatus(true);
      })
      .catch((error) => {
        console.error(error);
        setIsRegistrationStatus(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      });
  };

  const handleLogin = (email, password) => {
    apiAuth
      .signin({ email, password })
        .then((res) => {
        localStorage.setItem("JWT", res.token);
        api.setAuthorization(res.token);
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setIsRegistrationStatus(false);
        setIsInfoTooltipOpen(true);
      });
  };
 
    //удаляем JWT токен из локального хранилища браузера
    function handleSignOut() {
      localStorage.removeItem("JWT");
      setIsLoggedIn(false);
      setUserEmail("");
      api.setAuthorization('');
      localStorage.removeItem("isLoggedIn");
      navigate("/signin");
    }

    React.useEffect(() => {
      const checkToken = async () => {

        if (!localStorage.getItem("JWT") || tokenChecked) {
          return;
        }
    
        try {
          const res = await apiAuth.getToken(localStorage.getItem("JWT"));
          if (res) {
            setUserEmail(res.email);
            setIsLoggedIn(true);
            navigate('/', { replace: true });
          }
        } catch (err) {
          setIsLoggedIn(false);
          console.log(err);
        } finally {
          setTokenChecked(true);
        }
      };
      checkToken();
    }, [navigate, tokenChecked]);
    
  
  //обработчики событий открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handlePictureDeleteClick = (card) => {
    setDeletedCard(card);
    setIsPictureDeletePopupOpen(true);
  };

  //обработчик закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPictureDeletePopupOpen(false);
    setDeletedCard(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  //принимаем карточку в качестве параметра
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardDelete(card) {
    handleSubmit(() => {
      return api.deletePersonalCard(card._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      });
    });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // отправляем данные для изменения данных профиля
  function handleUpdateUser(user) {
    handleSubmit(() => {
      return api.getUserId(user).then((data) => {
        setCurrentUser(data);
      });
    });
  }

  function handleUpdateAvatar(data) {
    handleSubmit(() => {
      return api.editAvatar(data).then((data) => {
        setCurrentUser(data);
      });
    });
  }

  function handleAddPlaceSubmit(data) {
    handleSubmit(() => {
      return api.addCard(data).then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
      });
    });
  }

  //универсальная функция, которая принимает функцию запроса
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      // console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            loggedIn={isLoggedIn}
            email={userEmail}
            onClick={handleSignOut}
          />

          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegistration={handleRegister} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handlePictureDeleteClick}
                  onCardLike={handleCardLike}
                  loggedIn={isLoggedIn}
                />
              }
            />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <PictureDeletePopup
            isOpen={isPictureDeletePopupOpen}
            onClose={closeAllPopups}
            deletedCard={deletedCard}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onRegistration={handleRegister}
            isStatus={isRegistrationStatus}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
