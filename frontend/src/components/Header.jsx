import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const location = useLocation();
  //информация о пути страницы
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  let headerText;
  let headerLink;

  if (pathName === "/signin") {
    headerText = "Регистрация";
    headerLink = "/signup";
  } else if (pathName === "/signup") {
    headerText = "Войти";
    headerLink = "/signin";
  } else {
    headerText = props.loggedIn ? "Регистрация" : "Войти";
    headerLink = props.loggedIn ? "/signup" : "/signin";
  }

  return (
    <header className="header">
      {props.loggedIn && pathName === "/" ? (
        <div className="header__home">
          <img className="header__logo" src={logo} alt="логотип сайта место" />
          <div className="header__link-container">
            <div className="header__link-emai">{props.email}</div>
            <Link className="header__link-exit hover" onClick={props.onClick}>
              Выйти
            </Link>
          </div>
        </div>
      ) : (
        <div className="header__auth">
          <img className="header__logo" src={logo} alt="логотип сайта место" />
          <Link className="header__link" to={headerLink}>
            {headerText}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
