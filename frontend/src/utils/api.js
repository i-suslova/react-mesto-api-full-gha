class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // проверяем ответ сервера на корректность
  _correctServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // универсальный метод для отправки запроса
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(
      this._correctServerResponse
    );
  }

  // загрузка информации о пользователе с сервера
  _getUserInfo() {
    return this._request("users/me", {
      headers: this._headers,
    });
  }

  // получаем список всех карточек в виде массива (GET)
  _getInitialCards() {
    return this._request("cards", {
      headers: this._headers,
    });
  }

  // объединяем 2 функцииа
  async getAllNeedData() {
    try {
      const [userData, cardData] = await Promise.all([
        this._getUserInfo(),
        this._getInitialCards(),
      ]);

      return { userData, cardData };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // отправка данных для профиля (PATCH)
  getUserId(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // отправка данных для изменения аватара (PATCH)
  editAvatar(data) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  // отправка данных по удалению своей карточки (DELETE)
  deletePersonalCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // добавить на сервер новую карточку(POST)
  addCard(data) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // поставить лайк (PUT)
  addLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // удалить лайк (DELETE)
  deleteLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "a6201408-149a-4017-8f2e-d2f94e8d9514",
    "Content-Type": "application/json",
  },
});

export default api;
