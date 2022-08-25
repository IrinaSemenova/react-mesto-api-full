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
import MobileMenu from "./MobileMenu";

function App({}) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        if (data) {
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
          history.push("/signin");

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
          setCurrentUser(userInfo.data)
        })
        .catch(errorApi)
    }},[isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((initialCards) => {
        setCards(initialCards.data.reverse());
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

  function handleClickOpenMobileMenu() {
    if (isLoggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  }

// like card
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked, jwt)
        .then((newCard) => {
            setCards((state) =>
                state.map((c) =>
                    c._id === card._id ? newCard.data : c));
        })
        .catch(errorApi);
}

// delete card
  function handleCardDelete(cardId){
    const jwt = localStorage.getItem('jwt');
      setIsLoading("Удаление...");
      api.deleteCard(cardId, jwt)
          .then(() => {
              setCards((cards) => cards.filter((card) => card._id !== cardId));
              closeAllPopups();
            })
          .catch(errorApi)
          .finally(() => setIsLoading(false));
        };

// user Info change
  function handleUpdateUser (data){
    setIsLoading("Сохранение...");
    api.editUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

// avatar change
  function handleUpdateAvatar (data){
    setIsLoading("Сохранение...");
    api.editUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(errorApi)
      .finally(() => setIsLoading(false));
  }

// add new card
  function handleAddPlaceSubmit(data) {
    setIsLoading("Создание...");
    api.addNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
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
    setIsMobileMenuOpen(false);
    history.push("/signin");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
	    <div className="page">
        <MobileMenu
          emailUser={emailUser}
          onSignOut={handleSignOut}
          isMobileMenuOpen={isMobileMenuOpen}
        />
	      <Header
          emailUser={emailUser}
          onSignOut={handleSignOut}
          isMobileMenuOpen={isMobileMenuOpen}
          handleClickOpenMobileMenu={handleClickOpenMobileMenu}
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

          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="*">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
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
