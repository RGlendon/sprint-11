export default class CardList {
  constructor(container, api, card, userInfo) {
    this.container = container;
    this.api = api;
    this.card = card;
    this.userInfo = userInfo;

    // слушатель на весь контейнер
    this.container.addEventListener('click', this.eventHandler.bind(this));
  }

  addCard(card) {
    const newcard = this.card.create(card);
    newcard.dataset.id = card._id;
    this.card.updateLikesCount(newcard, card.likes.length);

    if (card.owner._id === this.userInfo._id) {
      newcard.querySelector('button').classList.add('place-card__delete-icon_appear');
    }
    if (card.likes.find(like => like._id === this.userInfo._id)) {
      this.card.setLike(newcard);
    }
    
    this.container.append(newcard);
  }

  render(initialCards) {

    initialCards.forEach((card) => {
      // console.log(card);
      this.addCard(card)
    });
    // for (let { name, link } of cards) {
    //   this.addCard(name, link);
    // }
  }

  eventHandler(event) {
    if (event.target.matches('.place-card__like-icon')) {
      let idCard = event.target.closest('.place-card').dataset.id;
      let card = event.target.closest('.place-card');
      // console.log(card);
      if (!event.target.matches('.place-card__like-icon_liked')) {
        this.api.likeCard(idCard)
          .then(result => {
            // console.log(result);
            this.card.like(event);
            this.card.updateLikesCount(card, result.likes.length);
          });
      } else {
        this.api.dislikeCard(idCard)
          .then(result => {
            // console.log(result);
            this.card.like(event);
            this.card.updateLikesCount(card, result.likes.length);
          });
      }

    }
    if (event.target.matches('.place-card__delete-icon')) {
      if (confirm('Вы действительно хотите удалить эту карточку?')) {
        let idCard = event.target.parentElement.parentElement.dataset.id;
        // console.log(idCard);
        this.api.deleteCard(idCard)
          .then(() => {
            this.card.remove(event);
          });
      }
    }
  }
}

