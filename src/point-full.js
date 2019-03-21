import Component from './сomponent.js';
import {isFunction} from './predicates.js';
import {Icons} from './travel-types.js';
import {getTime,
  getTravelWay,
  getOffersFullPoint,
  getDescription,
  getImages,
  getPrice,
} from './point/';

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

    this._onSubmit = null;
    this._onReset = null;
    this._state.isDate = false;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
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

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${Icons.get(this._type)}</label>
        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

       ${getTravelWay(this._type)}

      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">Flight to</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      ${getTime(this._time)}

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
    const submitButton = this._element.querySelector(`.point__button--save`);
    const resetButton = this._element.querySelector(`button[type="reset"]`);
    submitButton.addEventListener(`click`, this._onSubmitButtonClick);
    resetButton.addEventListener(`click`, this._onResetButtonClick);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return isFunction(this._onSubmit) && this._onSubmit();
  }

  _onResetButtonClick() {
    return isFunction(this._onReset) && this._onReset();
  }

  removeListeners() {
    this._element.querySelector(`.point__button--save`)
          .removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`button[type="reset"]`)
          .removeEventListener(`click`, this._onResetButtonClick);
  }

}
