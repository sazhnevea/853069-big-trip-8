export const getOffersPoint = (offers) => `
  <ul class="trip-point__offers">
  ${offers.map(({name, price}) => `
    <li>
      <button class="trip-point__offer">${name} +&euro;&nbsp;${price}
      </button>
    </li>`
  ).join(``)}
  </ul>`;


export const getOffersFullPoint = (offers) => `
  <section class="point__offers">
    <h3 class="point__details-title">offers</h3>
    <div class="point__offers-wrap">

      ${offers.map(({name, price}) => `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${name}" name="offer" value="${name}">
      <label for="${name}" class="point__offers-label">
        <span class="point__offer-service">${name}</span> + €<span class="point__offer-price">${price}</span>
      </label>`).join(``)}

    </div>
  </section>`;
