function ImagePopup ({card, onClose}){

    return (
        <div className={`popup popup_type_zoom ${card.link && 'popup_opened'}`}>
	        <div className="popup__container-img">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__img" 
                    src={card.link} 
                    alt={card.name}/>
                    
                <h2 className="popup__card-title">{card.name}</h2>
	        </div>
	    </div>
    )
}

export default ImagePopup;