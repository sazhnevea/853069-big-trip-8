export const getOffers = (offers) => `
  <ul class="trip-point__offers">
  ${offers.map(({name, price}) => `
    <li>
      <button class="trip-point__offer">${name} +&euro;&nbsp;${price}
      </button>
    </li>`
  ).join(``)}
  </ul>`;
