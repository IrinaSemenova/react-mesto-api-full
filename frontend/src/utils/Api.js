class Api {
    constructor(options) {
        this._url =  options.url;
        this._headers = options.headers;
    }

    _response(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }

      getUserInfo(){
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      getInitialCards() {
        return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          credentials: 'include',
          body: JSON.stringify({
            name: name,
            about: about
          })
        })
        .then(this._response);
      }

      addNewCard(name, link){
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          credentials: 'include',
          body: JSON.stringify({
            name: name,
            link: link
          })
        })
        .then(this._response);
      }

      deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
          method: 'PUT',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      removeLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      changeLikeCardStatus(cardId, like){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: like ? 'PUT' : 'DELETE',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._response);
      }

      editUserAvatar(avatar){
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          credentials: 'include',
          body: JSON.stringify({
            avatar: avatar
          })
        })
        .then(this._response);
      }
}

//create Api
const api = new Api({
  // url: 'https://api.domainbackmesto.students.nomoredomains.sbs',
  url: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json'
  }
});
export default api;
