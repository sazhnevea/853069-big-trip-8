import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import Component from './сomponent.js';
import isFunction from 'lodash/isFunction';
import {TravelTypes} from './travel-types.js';
import {
  getTimeOpenedPoint,
  getTravelType,
  getOffersFullPoint,
  getDescription,
  getImages,
  getPrice,
  getDestinations,
} from './point/';
import moment from 'moment';
import {API} from './api.js';

const api = new API({endPoint: `https://es8-demo-srv.appspot.com/big-trip`, authorization: `Basic eo0w590io168855`});
api.getDestinationsData().then(getDestinations);

const removeFlatpickr = (element) => {
  element.flatpickr().destroy();
};

export default class PointFull extends Component {
  constructor(data) {
    super();
    this._destination = data.destination;
    this._type = data.type;
    this._pictures = data.pictures;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._offers = data.offers;
    this._id = data.id;
    this._isFaforite = data.isFavorite;
    this._onDelete = false;

    this._destinations = null;
    this._onSubmit = null;
    this._onTravelType = null;
    this._state.isTimeClicked = false;
    this._state.isPriceClicked = false;
    this._state.isDestinationClicked = false;
    this._isDeleted = false;

    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeDestination = this._onChangeDestination.bind(this);

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onTravelTypeClick = this._onTravelTypeClick.bind(this);

  }

  _processForm(formData) {
    const entry = {
      price: ``,
      destination: ``,
      time: {
        start: ``,
        end: ``,
      },
      offers: this._offers,
    };

    const pointEditMapper = PointFull.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }
    return entry;
  }

  static createMapper(target) {
    return {
      'price': (value) => (target.price = Number(value)),
      'destination': (value) => (target.destination = value),
      'travel-way': (value) => (target.type = value),
      'date-start': (value) => (target.time.start = moment(value, `LT`).valueOf()),
      'date-end': (value) => (target.time.end = moment(value, `LT`).valueOf()),
    };
  }


  _onChangePrice() {
    this._state.isPriceClicked = !this._state.isPriceClicked;
  }

  _onChangeTime() {
    this._state.isTimeClicked = !this._state.isTimeClicked;
  }

  _onChangeDestination() {
    this._state.isDestinationClicked = !this._state.isDestinationClicked;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onTravelType(fn) {
    this._onTravelType = fn;
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
     
      ${getTravelType(this._type)}

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${TravelTypes.get(this._type)}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
                    
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
     <section class="point__offers">
    <h3 class="point__details-title">offers</h3>
    <div class="point__offers-wrap">

      ${getOffersFullPoint(this._offers)}

    </div>
  </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        
        ${getDescription(this._description)}

        ${getImages(this._pictures)}

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
      .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.travel-way__select-group`)
      .addEventListener(`click`, this._onTravelTypeClick);

    const getFlatpickrConfig = (value) => {
      const config = {
        defaultDate: [moment(value).valueOf()],
        enableTime: true,
        noCalendar: false,
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
    if (isFunction(this._onSubmit)) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (isFunction(this._onDelete)) {
      this._onDelete({id: this._id});
    }
  }

  _onTravelTypeClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `LABEL`) {
      const typeTaken = evt.target.textContent.split(` `)[1].toLowerCase();
      api.getOffers().then((values) => this.changeOffers(values, typeTaken));
    }

    const offersElement = this._element.querySelector(`.point__offers-wrap`);
    offersElement.innerHTML = ``;
    offersElement.innerHTML = getOffersFullPoint(this._offers) ? getOffersFullPoint(this._offers) : ``;
  }

  changeOffers(offers, type) {
    offers.forEach((offer) => {
      if (offer.type === type) {
        this._offers = offer.offers;
      }
    });
  }

  markAsDeleted() {
    this._isDeleted = !this._isDeleted;
  }

  update(data) {
    this._price = data.price;
    this._destination = data.destination;
    this._time = data.time;
  }

  lockButtons() {
    this._element.querySelector(`.point__button--save`).disabled = true;
    this._element.querySelector(`button[type="reset"]`).disabled = true;
    this._element.querySelector(`.point__destination-input`).disabled = true;
  }

  unlockButtons() {
    this._element.querySelector(`.point__button--save`).disabled = false;
    this._element.querySelector(`button[type="reset"]`).disabled = false;
    this._element.querySelector(`.point__destination-input`).disabled = false;
  }

  savingButtonMode() {
    this._element.querySelector(`.point__button--save`).textContent = `Saving...`;
  }

  saveButtonMode() {
    this._element.querySelector(`.point__button--save`).textContent = `Save`;
  }

  deletingButtonMode() {
    this._element.querySelector(`button[type="reset"]`).textContent = `Deleting...`;
  }

  deleteButtonMode() {
    this._element.querySelector(`button[type="reset"]`).textContent = `Delete`;
  }

  getWarning() {
    this._element.classList.add(`shake`);
    this._element.setAttribute(`style`, `border: 2px solid red`);
  }

  removeWarning() {
    this._element.classList.remove(`shake`);
  }


}
