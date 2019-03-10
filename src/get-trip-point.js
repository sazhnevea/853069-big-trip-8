import getIconType from "./get-icon-type.js";
import {getOffersMarkup} from "./get-special-offers";
import getTime from "./get-schedule.js";

export default (point) =>
  `<article class="trip-point">
     ${getIconType(point.type)}
     <h3 class="trip-point__title">${point.title}</h3>
     ${getTime(point.time)}
     <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
     ${point.offers.size > 0 ? getOffersMarkup(point.offers) : ``}
   </article>`;
