import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

function Register(props) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate("/sign-up");
    }
  }, [props.loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegistration(values.email, values.password);
  }

  return (
    <div className="auth auth__register">
      <h2 className="auth__title">Регистрация</h2>

      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="auth__form-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <button className="auth__form-button" type="submit">
          Зарегистрироваться
        </button>

        <Link to="/sign-in" className="auth__form-help hover">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
