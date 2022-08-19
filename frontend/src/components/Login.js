import {useState} from 'react';


function Login ({onLogin}) {
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
        onLogin(email, password);
        resetLogForm();
      }

    function resetLogForm(){
        setEmail('');
        setPassword('')
      }

    return(
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <div className="login__container">
                <form className="login__form" name="login" id="login" onSubmit={handleSubmit}>
                    <label htmlFor="email"></label>
                    <input className="login__input login__input_email" id="email" name="email" type="email" placeholder="Email" onChange={handleChangeEmail} value={email} required/>
                    <label htmlFor="password"></label>
                    <input className="login__input login__input_password" id="password" name="password" type="password" placeholder="Пароль" onChange={handleChangePassword} value={password} required/>
                    <button className="login__submit" type="submit" id="login__submit">Войти</button>
                </form>
            </div>
        </div>
          
    )
}

export default Login;