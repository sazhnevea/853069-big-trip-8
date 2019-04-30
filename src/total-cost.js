import Component from './сomponent.js';

export default class TotalCost extends Component {
  constructor(arr) {
    super();
    this._totalCost = this.getTotalCost(arr);
  }

  get template() {
    return `
     <p class="trip__total">Total:
       <span class="trip__total-cost">
         &euro;&nbsp;${this._totalCost}
       </span>
     </p>`.trim();
  }

  getTotalCost(data) {
    return data.reduce((acc, value) => acc + value.price, 0);
  }

  update(data) {
    this._totalCost = this.getTotalCost(data);
  }

}
