import logo from "../images/header/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const linkName = {'/': 'Выйти', '/sign-up': 'Войти', '/sign-in': 'Регистрация'}
  function handleLogout(){
    props.onLogout()
  };
 
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className="header__menu">
        {location.pathname === '/sign-in' && <Link className="header__link" to="/sign-up">{linkName[location.pathname]}</Link> }
        {location.pathname === '/sign-up' && <Link className="header__link" to="/sign-in">{linkName[location.pathname]}</Link> }
        {location.pathname === '/' && <p className="header__link header__link_type_email">{props.userEmail}</p> }
        {location.pathname === '/' && <Link onClick={handleLogout} to="" className="header__link header__link_type_exit">{linkName[location.pathname]}</Link> }
      </div>     
    </header>
  );
}

export default Header;
