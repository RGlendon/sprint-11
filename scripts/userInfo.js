class UserInfo {
  constructor(container, api) {
    this.container = container;
    this.api = api;
    this.name = document.querySelector('.user-info__name').textContent;
    this.about = document.querySelector('.user-info__job').textContent;
  }

  setUserInfo({name, about, avatar, _id}) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._id = _id;
  }

  displayUserInfo() {
    this.container.querySelector('.user-info__name').textContent = this.name;
    this.container.querySelector('.user-info__job').textContent = this.about;
    this.container.querySelector('.user-info__photo').style.backgroundImage = `url(${this.avatar}`;
  }
}
