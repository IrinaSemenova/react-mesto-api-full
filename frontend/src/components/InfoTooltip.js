import ok from '../image/OK.png';
import nok from '../image/NOK.png';


function InfoTooltip ({ isOpen, onClose, isOk, successText, errorText }) {
    return (
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button className="popup__close-button" type="button" onClick={onClose} />
          <img className="popup__signup-img"
            src={isOk ? ok : nok}
            alt={isOk ? successText : errorText}
          />
          <p className="popup__signup-title">
            {isOk
              ? successText
              : errorText}
          </p>
        </div>
      </div>
    );
  };
  
  export default InfoTooltip;