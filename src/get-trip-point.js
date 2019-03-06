import {pointsIcons} from "./mock/mock-constants";
import {getSpecialOffersString} from "./mock/special-offers";
import {addLeadingZero} from "./utils";
export default (point) =>
  `<article class="trip-point">
  <i class="trip-icon">${pointsIcons[point.type]}</i>
  <h3 class="trip-point__title">${point.title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${ addLeadingZero(point.time.start.getHours())}:${addLeadingZero(point.time.start.getMinutes())}&nbsp;&mdash;${addLeadingZero(point.time.end.getHours())}:${addLeadingZero(point.time.end.getMinutes())}</span>
    <span class="trip-point__duration">${point.time.interval.hours}h ${point.time.interval.minutes}m</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
  <ul class="trip-point__offers">
    ${getSpecialOffersString(point.offers)}
  </ul>
</article>`;
