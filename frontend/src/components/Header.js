import logo from '../image/Logo.svg';
import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';


function Header ({emailUser, onSignOut}) {
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
