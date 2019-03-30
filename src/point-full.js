import Component from './сomponent.js';
import isFunction from 'lodash/isFunction';
import {
  getTimeOpenedPoint,
  getTravelWay,
  getOffersFullPoint,
  getDescription,
  getImages,
  getPrice,
} from './point/';
import flatpickr from './libraries/flatpickr.js';
import moment from 'moment';

const removeFlatpickr = (element) => {
  element.flatpickr().destroy();
};

export default class PointFull extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._type = data.type;
    this._picture = data.picture;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._offers = data.offers;
    this._destination = data.destination;


    this._onSubmit = null;
    this._onDelete = null;
    this._state.isTimeClicked = false;
    this._state.isPriceClicked = false;
    this._state.isDestinationClicked = false;
    this._isDeleted = false;

    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      price: ``,
      destination: ``,
      time: {
        start: ``,
        end: ``,
      },
    };

    const pointEditMapper = PointFull.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      pointEditMapper[property] && pointEditMapper[property](value);
    }
    if (entry.destination) {
      const arr = this._title.split(` `, 2);
      arr.push(entry.destination);
      entry.title = arr.join(` `);
    }
    return entry;
  }

  _onChangePrice() {
    this._state.isPriceClicked = !this._state.isPriceClicked;
    this._partialUpdate();
  }

  _onChangeTime() {
    this._state.isTimeClicked = !this._state.isTimeClicked;
    this._partialUpdate();
  }

  _onChangeDestination() {
    this._state.isDestinationClicked = !this._state.isDestinationClicked;
    this._partialUpdate();
  }


  _partialUpdate() {
    this.removeListeners();
    const oldElement = this._element;
    this.createListeners();
    oldElement.parentNode.replaceChild(this._element, oldElement);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
   <article class="point">
    <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>
     
       ${getTravelWay(this._type)}

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${this._title.split(` `, 2).join(` `)}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._title.split(` `)[2]}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      ${getTimeOpenedPoint(this._time)}

      ${getPrice(this._price)}

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
    
      ${getOffersFullPoint(this._offers)}

      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        
        ${getDescription(this._description)}

        ${getImages(this._picture)}

      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>
`.trim();
  }

  createListeners() {
    this._element.querySelector(`.point__button--save`)
      .addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`button[type="reset"]`)
      .addEventListener(`click`, this._onDelete);

    const getFlatpickrConfig = (value) => {
      const config = {
        defaultDate: [moment(value).valueOf()],
        enableTime: true,
        [`time_24hr`]: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`,
      };
      return config;
    };

    flatpickr(this._element.querySelector(`.point__input[name='date-start']`), getFlatpickrConfig(this._time.start));
    flatpickr(this._element.querySelector(`.point__input[name='date-end']`), getFlatpickrConfig(this._time.end));

  }

  removeListeners() {
    this._element.querySelector(`.point__button--save`)
      .removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`button[type="reset"]`)
      .removeEventListener(`click`, this._onDeleteButtonClick);

    removeFlatpickr(this._element.querySelector(`.point__input[name='date-start']`));
    removeFlatpickr(this._element.querySelector(`.point__input[name='date-end']`));
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);
    isFunction(this._onSubmit) && this._onSubmit(newData);
    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    this._isDeleted = !this._isDeleted;
  }

  update(data) {
    this._price = data.price;
    this._destination = data.destination;
    this._title = data.title;
    this._time = data.time;
    this._title = data.title;
    this._isDeleted = data._isDeleted;
  }

  static createMapper(target) {
    return {
      'price': (value) => (target.price = value),
      'destination': (value) => (target.destination = value),
      'travel-way': (value) => (target.type = value),
      'date-start': (value) => (target.time.start = value),
      'date-end': (value) => (target.time.end = value),
    };
  }

}
