import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
      ` ${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`
    );

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
      ` elements__like ${isLiked ? 'elements__like_active' : ''}`
    );

    function handleClick() {
      onCardClick(card);
    } 

    function handleLikeClick() {
      onCardLike(card);
    };
  
    function handleDeleteClick(){
      onCardDelete(card._id);
    }

    return (
        <li className="elements__items">
            <img className="elements__img" 
                src={card.link} 
                alt={card.name} 
                onClick={handleClick}/>

            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="elements__block">
              <h2 className="elements__title">{card.name}</h2>
              <div className="elements__button">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <span className="elements__count">{card.likes.length}</span>
              </div>
            </div>
	    </li>
    )
}
export default Card;