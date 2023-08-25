import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

function Login(props) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }

  return (
    <div className="auth auth__login">
      <h2 className="auth__title">Вход</h2>
      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth__form-input"
          type="password"
          minLength="4"
          name="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          required
        />
        <button className="auth__form-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
