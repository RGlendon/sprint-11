class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeFetch(url, method = 'GET', type = undefined, body = undefined) {
    if (body) {
      body = JSON.stringify(body);
    }
    return fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        authorization: this.headers.authorization,
        'content-type': type,
      },
      body,
    })
      .then(res => {
        if (!res.ok) {
          throw 'Что-то пошло не так';
        }
        return res.json();
      })
      .catch(err => console.log(err));
  }

  getUserInfo() {
    return this.makeFetch('/users/me');
  }

  getInitialCards() {
    return this.makeFetch('/cards');
  }

  updateUserInfo(name, about) {
    let body = {
      name,
      about,
    };
    return this.makeFetch('/users/me', 'PATCH', 'application/json', body);
  }

  addNewCard(name, link) {
    let body = {
      name,
      link
    }
    return this.makeFetch('/cards', 'POST', 'application/json', body);
  }

  deleteCard(id) {
    return this.makeFetch(`/cards/${id}`, 'DELETE');
  }

  likeCard(id) {
    return this.makeFetch(`/cards/like/${id}`, 'PUT');
  }

  dislikeCard(id) {
    return this.makeFetch(`/cards/like/${id}`, 'DELETE');
  }

  changeAvatar(avatar) {
    let body = {
      avatar,
    };
    return this.makeFetch('/users/me/avatar', 'PATCH', 'application/json', body);
  }
}