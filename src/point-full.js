import Component from './сomponent.js';
import isFunction from 'lodash/isFunction';
import {TravelTypes} from './travel-types.js';
import {
  getTimeOpenedPoint,
  getTravelWay,
  getOffersFullPoint,
  getDescription,
  getImages,
  getPrice,
  getDestinations,
} from './point/';
import flatpickr from './libraries/flatpickr.js';
import moment from 'moment';
import {API} from './api.js';


const removeFlatpickr = (element) => {
  element.flatpickr().destroy();
};

export default class PointFull extends Component {
  constructor(data) {
    super();
    this._destination = data.destination;
    this._type = data.type;
    this._pictures = data.picture;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._offers = data.offers;
    this._id = data.id;
    this._isFaforite = data.isFavorite;
    this._onDelete = false;

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
    this._onTravelWayClick = this._onTravelWayClick.bind(this);

  }

  _processForm(formData) {
    const entry = {
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
    // if (entry.destination) {
    //   const arr = this._destination.split(` `, 2);
    //   arr.push(entry.destination);
    //   entry.destination = arr.join(` `);
    // }
    return entry;
  }

  static createMapper(target) {
    return {
      'price': (value) => (target.price = value),
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
     
       ${getTravelWay(this._type)}

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
    
      ${getOffersFullPoint(this._offers)}

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
      .addEventListener(`click`, this._onTravelWayClick);

    const getFlatpickrConfig = (value) => {
      const config = {
        defaultDate: [moment(value).valueOf()],
        enableTime: true,
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
    isFunction(this._onDelete) && this._onDelete({id: this._id});
  }

  _onTravelWayClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `LABEL`) {
      const typeTaken = evt.target.textContent.split(` `)[1].toLowerCase();
      const api = new API({endPoint: `https://es8-demo-srv.appspot.com/big-trip`, authorization: `Basic eo0w590io258587`});
      api.getOffers().then((values) => this.changeOffers(values, typeTaken));
    }
    // isFunction(this._onTravelType) && this._onTravelType();
    const test = this._element.querySelector(`.point__offers-wrap`);
    test.innerHTML = ``;
    test.innerHTML = getOffersFullPoint(this._offers) && getOffersFullPoint(this._offers);
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


}
