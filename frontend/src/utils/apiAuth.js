class ApiAuth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // проверяем ответ сервера на корректность
  _correctServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  // универсальный метод для отправки запроса
  _request(endpoint, options) {
    return fetch(`${this.baseUrl}/${endpoint}`, options).then(
      this._correctServerResponse
    );
  }

  // запрос для регистрации
  signup({ email, password }) {
    return this._request("signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  //запрос для авторизации
  signin({ email, password }) {
    return this._request("signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  //запрос для проверки валидности токена и
  //получения email для вставки в шапку сайта
  getToken(token) {
    return this._request("users/me", {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const apiAuth = new ApiAuth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;
