class Card {
  // constructor(name, link) {
  //   this.card = this.create(name, link);
  //   this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
  //   this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  // }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  setLike(elem) {
    elem.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
  }

  updateLikesCount(elem, count) {
    elem.querySelector('.place-card__like-count').textContent = count;
  }

  remove(event) {
    const current = event.target.parentElement.parentElement;
    current.remove();
  }

  create(card) {
    const container = document.createElement('div');

    function sanitarize(string) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
      };
      const reg = /[&<>"'/]/ig;
      // console.log(string.replace(reg, (match) => (map[match])));
      return string.replace(reg, (match) => (map[match]));
    }

    container.insertAdjacentHTML('beforeend',
      `<div class="place-card">
        <div class="place-card__image" style="background-image: url(${sanitarize(card.link)})">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${sanitarize(card.name)}</h3>
          <div class="place-card__like-container">
            <button class="place-card__like-icon"></button>
            <div class="place-card__like-count"></div>
          </div>
        </div>
      </div>`
    );

    return container.firstElementChild;
  }
}
