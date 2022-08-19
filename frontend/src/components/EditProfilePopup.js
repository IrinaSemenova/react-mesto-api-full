import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext, useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({isOpen, onClose, onUpdateUser, isLoading}){
    const currentUser = useContext(CurrentUserContext);
    const [userName, setUserName] = useState('');
    const [userJob, setUserJob] = useState('');

// Обработчик изменения инпута обновляет стейт
    function handleNameChange(e) {
        setUserName(e.target.value);
    }
    
    function handleJobChange(e) {
        setUserJob(e.target.value);
    }

    useEffect(() => {
        setUserName(currentUser.name);
        setUserJob(currentUser.about);
      }, [currentUser,isOpen])

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: userName,
            about: userJob,
        });
      }

    return (
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          submitText={isLoading || "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
             <fieldset className="popup__fieldset">
              <section className="popup__section">
                <input className="popup__input popup__input_type_name" id="username" type="text" value={userName || ''} onChange={handleNameChange} placeholder="Имя" name="username" minLength="2" maxLength="40" required/>
                <span className="popup__input-error name-input-error" id="username-error"></span>
              </section>
              <section className="popup__section">
                <input className="popup__input popup__input_type_job" id="userjob" type="text" value={userJob || ''} onChange={handleJobChange} placeholder="Профессия" name="userjob" minLength="2" maxLength="200" required/>
                <span className="popup__input-error job-input-error" id="userjob-error"></span>
              </section>
	          </fieldset>
        </PopupWithForm>
    )
} 

export default EditProfilePopup;