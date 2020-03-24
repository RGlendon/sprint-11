class Popup {
  constructor(popup) {
    this.popup = popup;
    //пришлось создать переменную, т.к. у кнопок разные названия: Сохранить и +. Используется в renderLoading
    this.button = this.popup.querySelector('.popup__button') || undefined;
    this.buttonInitialValue = (this.button) ? this.button.textContent : undefined;

    document.addEventListener('keydown', (event) => {
      if (this.popup.matches('.popup_is-opened') && event.key === "Escape") {
        this.close();
      }
    });
    this.popup.addEventListener('click', (event) => {
      const content = this.popup.querySelector('.popup__content') || this.popup.querySelector('.popup__image-wrapper');
      // console.log(content);
      if (event.target.matches('.popup__close') || !content.contains(event.target)) {
        this.close();
      }
    });
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    //скрываем предупреждения об ошибках
    const alarms = this.popup.querySelectorAll('.popup__input-container');
    alarms.forEach(element => {
      element.classList.remove('popup__input-container_invalid');
    });

    this.popup.classList.remove('popup_is-opened');
  }

  renderLoading(isLoading) {
    const button = this.popup.querySelector('.popup__button');

    if (isLoading) {
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = this.buttonInitialValue;
    }
  }
}

/*  
* Нужно исправить: Принято называть названия файлов по имени класса, 
* Допустим класс CardList должен лежать в файле CardList.js
* Класс Popup должен лежать в файле с названием Popup.
* Когда файлом сотни и тысячи в проекте, проще разобраться где и какой класс лежит
*/
class PopupImage extends Popup {
  constructor(popup) {
    super(popup)
    this.image = popup.querySelector('.popup__item');
  }

  open(url) {
    this.image.src = url;
    super.open();
  }
}



/*
* Нужно исправить: Принято называть названия файлов по имени класса,
* Допустим класс CardList должен лежать в файле CardList.js
* Класс Popup должен лежать в файле с названием Popup.
* Когда файлом сотни и тысячи в проекте, проще разобраться где и какой класс лежит
*/
class PopupEdit extends Popup {
  constructor(popup) {
    super(popup);
    // this.formEdit = formEdit;
    // this.userInfo = userInfo;
  }

  fillInputs(form, userInfo) {
    form.elements.fullName.value = userInfo.name;
    form.elements.infoJob.value = userInfo.about;
  }
}