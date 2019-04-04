import Component from './сomponent.js';
import {createFilter} from './create-element.js';
import isFunction from 'lodash/isFunction';

export default class Filter extends Component {
  constructor(name) {
    super();
    this._name = name;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  createListeners() {
    this._element.querySelector(`.trip-filter__item`)
      .addEventListener(`click`, this._onFilterClick);
  }

  removeListeners() {
    this._element.querySelector(`.trip-filter__item`)
      .removeEventListener(`change`, this._onFilterClick);
  }

  render() {
    this._element = createFilter(this.template);
    this.createListeners();

    return this._element;
  }

  _onFilterClick() {
    isFunction(this._onFilter) && this._onFilter();
  }

  get template() {
    return `<input type="radio" id="filter-${this._name}" name="filter" value="${this._name}" ${(this._name === `everything`) ? `checked` : ``}>
            <label class="trip-filter__item" for="filter-${this._name}">${this._name}</label>`;
  }

  // switch (filter) {
    //   case `everything`:
    //     return points;

    //   case `future`:
    //     return points.filter((point) => Date.parse(point.time.start) < Date.now());

    //   case `past`:
    //     return points.filter((point) => Date.parse(point.time.start) > Date.now());
    // }


}
