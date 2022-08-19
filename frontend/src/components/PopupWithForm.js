function PopupWithForm ({name, title, submitText, children, isOpen, onClose, onSubmit}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'} `}> 
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form 
                    className="popup__form" 
                    name={`${name}`} 
                    onSubmit={onSubmit}
                    >   
                    {children}
                    
                    <button className="popup__submit" type="submit" >{submitText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;