export const getOffersPoint = (offers) => `
  <ul class="trip-point__offers">
  ${offers.map(({title, price}) => `
    <li>
      <button class="trip-point__offer">${title} +&euro;&nbsp;${price}
      </button>
    </li>`
  ).join(``)}
  </ul>`;


export const getOffersFullPoint = (offers) => `
 
      ${offers.map(({title, price}) => `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${title}" name="offer" value="${title}">
      <label for="${title}" class="point__offers-label">
        <span class="point__offer-service">${title}</span> + €<span class="point__offer-price">${price}</span>
      </label>`).join(``)}`
;
