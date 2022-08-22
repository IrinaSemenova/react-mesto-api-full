export const BASE_URL = "http://localhost:3000";

const response = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  }

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then(response);
  };

  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers,
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
      .then(response);
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
       ...headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(response)
      .then(data => data)
  };
