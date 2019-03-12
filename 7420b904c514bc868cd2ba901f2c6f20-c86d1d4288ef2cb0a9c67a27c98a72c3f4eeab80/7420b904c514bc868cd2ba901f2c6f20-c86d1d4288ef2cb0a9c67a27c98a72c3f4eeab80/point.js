import {
  getIcon,
  getOffers,
  getSchedule,
} from './point/index';

export const getPoint = ({type, title, time, price, offers}) => `
  <article class="trip-point">
    ${getIcon(type)}
    <h3 class="trip-point__title">${title}</h3>
    ${getSchedule(time)}
    <p class="trip-point__price">&euro;&nbsp;${price}</p>
    ${offers.length > 0 ? getOffers(offers) : ``}
  </article>`;