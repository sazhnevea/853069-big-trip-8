import {createElement} from './create-element.js';
import {
  getIcon,
  getOffers,
  getSchedule,
} from './point/';


export default class Point {
  constructor(data) {
    this._title = data.title;
    this._type = data.type;
    this._picture = data.picture;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._offers = data.offers;

    this._element = null;
    this._state = {
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <article class="trip-point">
      ${getIcon(this._type)}
      <h3 class="trip-point__title">${this._title}</h3>
      ${getSchedule(this._time)}
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      ${this._offers.length > 0 ? getOffers(this._offers) : ``}
    </article>`.trim();
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    const editButton = this._element.querySelector(`.trip-point__title`);
    editButton.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  static checkForTrue(it) { // поставить в соовтетствии с порядком
    return it === true;
  }

  _onEditButtonClick() {
    console.log(`click`);
    return typeof this._onEdit === `function` && this._onEdit();
  }

  unbind() {
    console.log(this._element)
    this._element.querySelector(`.trip-point__title`)
          .removeEventListener(`click`, this._onEditButtonClick);
  }
}
