import {useRef,useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose,onAddPlace, submitText, isLoading}){
    const nameRef = useRef('');
    const linkRef = useRef('');

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            name: nameRef.current.value,/* Значение инпута, полученное с помощью рефа */
            link: linkRef.current.value/* Значение инпута, полученное с помощью рефа */
          });
    }

    useEffect(() => {
      nameRef.current.value = '';
      linkRef.current.value = ''
  }, [isOpen])

    return(
        <PopupWithForm
          name="card"
          title="Новое место"
          submitText={isLoading || "Создать"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
              <section className="popup__section">
                <input className="popup__input popup__input_type_img-name" id="name" type="text" ref={nameRef} placeholder="Название" name="name" minLength="2" maxLength="30" required/>
                <span className="popup__input-error img-input-error" id="name-error"></span>
              </section>        
              <section className="popup__section">
                <input className="popup__input popup__input_type_img-link" id="link" type="url" ref={linkRef} placeholder="Ссылка на картинку" name="link" required/>
                <span className="popup__input-error url-input-error" id="link-error"></span>
              </section>	
	          </fieldset>
        </PopupWithForm>
 
    )
}

export default AddPlacePopup;