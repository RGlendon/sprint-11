const errorMessage = {
  must: 'Это обязательное поле',
  length: 'Должно быть от 2 до 30 символов',
  link: 'Здесь должна быть ссылка',
  ok: '',
};


class FormValidation {
  constructor(form) {
    this.form = form;
    this.button = form.querySelector('button');
    this.form.addEventListener('input', this.validate.bind(this));
  }

  validate(event) {
    this.setSubmitButtonState(this.form, this.button);

    if (this.checkInputValidity(event.target)) {
      return this.activateError(event.target);
    }
    return this.resetError(event.target);
  }

  activateError(elem) {
    elem.parentElement.classList.add('popup__input-container_invalid');
  }
  resetError(elem) {
    elem.parentElement.classList.remove('popup__input-container_invalid');
  }

  checkInputValidity(elem) {
    const errorElem = document.querySelector(`#error-${elem.name}`);

    // console.dir(elem);
    if (elem.validity.typeMismatch) {
      return errorElem.textContent = errorMessage.link;
    }
    if (elem.validity.valueMissing) {
      return errorElem.textContent = errorMessage.must;
    }
    if ((elem.value.length < 2 || elem.value.length > 30) && (elem.name !== 'link' && elem.name !== 'avatarLink')) {
      return errorElem.textContent = errorMessage.length;
    }
    return errorElem.textContent = errorMessage.ok;
  }

  setSubmitButtonState(form, button) {
    //не хочу испльзовать встроенную валидацию т.к. она не точная

    // if (!form.checkValidity()) {
    //   return button.setAttribute('disabled', true);
    // }
    // return button.removeAttribute('disabled');
    const inputs = Array.from(form.elements);

    let isValid = true;

    inputs.forEach((item) => {
      if (!item.matches('.button')) {
        if (this.checkInputValidity(item)) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      return button.removeAttribute('disabled');
    }

    return button.setAttribute('disabled', '');
  }

}
