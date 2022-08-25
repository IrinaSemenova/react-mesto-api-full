import logo from '../image/Logo.svg';
import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import burgerMenu from "../image/burger-menu-line.svg";
import closeMenuIcon from "../image/Close-menu.svg";

function Header ({emailUser,onSignOut,handleClickOpenMobileMenu, isMobileMenuOpen}) {
    return (
        <header className="header">
	        <img className="header__logo" src={logo} alt="Место"/>
            <Switch>
                <Route path="/signin">
                    <Link className="header__link" to="/signup">Регистрация</Link>
                </Route>
                <Route path="/signup">
                    <Link className="header__link" to="/signin">Войти</Link>
                </Route>
                <Route exact path="/">
                  <button className="header__burger" type="button" onClick={handleClickOpenMobileMenu}
                          style={{
                              backgroundImage: `url(${
                                isMobileMenuOpen ? closeMenuIcon : burgerMenu
                              })`,
                          }}
                  ></button>
                  <div className="header__container">
                        <p className="header__email">{emailUser}</p>
                        <Link className="header__link-exit" to="/signin" onClick={onSignOut}>Выйти</Link>
                  </div>
                </Route>
            </Switch>
	      </header>
    )
}
export default Header;



