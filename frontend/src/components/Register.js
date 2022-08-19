import {useState} from 'react';
import  {Link} from 'react-router-dom';

function Register ({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
    
    function handleChangePassword(e) {
        setPassword(e.target.value);
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
        resetRegForm();
      }
    
    function resetRegForm(){
        setEmail('');
        setPassword('')
      }

    return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <div className="register__container">
                <form className="register__form" name="register" id="register" onSubmit={handleSubmit}>
                    <label htmlFor="email"></label>
                    <input className="register__input register__input_email" id="email" name="email" type="email" placeholder="Email" onChange={handleChangeEmail} value={email} required/>
                    <label htmlFor="password"></label>
                    <input className="register__input register__input_password" id="password" name="password" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password} required/>
                    <button className="register__submit" type="submit" id="register__submit">Зарегистрироваться</button>
                </form>
            </div>
        
            <div className="register__signin">
                <p className="register__text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__signin-link">Войти</Link>
            </div>
        </div>
          
    )
}

export default Register;