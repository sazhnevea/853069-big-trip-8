import Component from './сomponent.js';
import {isFunction} from './predicates.js';

import {
  getIcon,
  getOffers,
  getSchedule,
} from './point/';

export default class Point extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._type = data.type;
    this._picture = data.picture;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._offers = data.offers;

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  set onEdit(fn) {
    this._onEdit = fn;
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

  _onEditButtonClick() {
    return isFunction(this._onEdit) && this._onEdit();
  }

  createListeners() {
    const editButton = this._element.querySelector(`.trip-point__title`);
    editButton.addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.trip-point__title`)
          .removeEventListener(`click`, this._onEditButtonClick);
  }
}
