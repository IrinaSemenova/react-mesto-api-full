import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Register from './Register';
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App({}) {  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removedCardId, setRemovedCardId] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState();
  const [emailUser, setEmailUser] = useState("");
  const [isRegisterOk, setIsRegistrOk] = useState(false);
  const history = useHistory();

// create Error Api
  function errorApi(err){
    console.log(`Ошибка: ${err}`);
  }

// check token, avtorize user & email
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((response) => {
          if (response) {
            setLoggedIn(true);
            setEmailUser(response.data.email);
            history.push("/");
          }
        })
        .catch(errorApi);
    }
  }, []);

// login user, save token & email
  function handleLogin(email, password) {
    if (!email || !password) {
      return
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setEmailUser(email);
          history.push("/");
          localStorage.setItem("jwt", data.token);
        }
      })
      .catch((err) => {
        setIsRegistrOk(false);
        setIsInfoTooltipPopupOpen(true);
        errorApi(err);
      });
  }

// register user, open popup reg 
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
          setIsRegistrOk(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("/sign-in");
        
      })
      .catch((err) => {
        setIsRegistrOk(false);
        setIsInfoTooltipPopupOpen(true);
        errorApi(err);
      });
  }

// if login then user info & card
  useEffect(() => {
    if (isLoggedIn) {
        api.getUserInfo()
          .then((userInfo)=>{
          setCurrentUser(userInfo)
        })
        .catch(errorApi)
    }},[isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((initialCards) => {
        setCards(initialCards);
      })
      .catch(errorApi)
    }},[isLoggedIn]);

// click function
  function handleEditAvatarClick () {
    console.log("Avatar");  
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick () {
    console.log("Profile");  
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick () {
    console.log("Place");  
    setIsAddPlacePopupOpen(true);
  }
  function handleCardDeleteClick (cardId) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setRemovedCardId(cardId);
  };

  function handleCardClick (card) {
    setSelectedCard(card);
  }

// like card
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => 
                state.map((c) => 
                    c._id === card._id ? newCard : c));
        })
        .catch(errorApi);
}

// delete card
  function handleCardDelete(cardId){
      setIsLoading("Удаление...");
      api.deleteCard(cardId)
          .then(() => {
              setCards((cards) => cards.filter((card) => card._id !== cardId));
              closeAllPopups();
            })
          .catch(errorApi)
          .finally(() => setIsLoading(false));
        };

// user Info change
  function handleUpdateUser (newUserInfo){
    setIsLoading("Сохранение...");
    api.editUserInfo(newUserInfo.name, newUserInfo.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

// avatar change
  function handleUpdateAvatar (newAvatar){
    setIsLoading("Сохранение...");
    api.editUserAvatar(newAvatar.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

// add new card
  function handleAddPlaceSubmit(card) {
    setIsLoading("Создание...");
    api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

// close popup
  function closeAllPopups () {
    console.log("close"); 
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

//exit & delete token
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmailUser("");
    history.push("/sign-in");
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
	    <div className="page">
	      <Header 
          emailUser={emailUser}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
          
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>

          <Route path="*">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          
        </Switch>
        
	      <Footer />

        <ImagePopup 
            card = {selectedCard}
            onClose = {closeAllPopups}
          />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            deleteCard={handleCardDelete}
            card={removedCardId}
          /> 

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isOk={isRegisterOk}
            successText="Вы успешно зарегистрировались!"
            errorText="Что-то пошло не так! Попробуйте ещё раз."
          />
	
	    </div>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
