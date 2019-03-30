export const getPrice = (price) => `
  <label class="point__price">
    ${price}
    <span class="point__price-currency">€</span>
    <input class="point__input" type="text" value="${price}" name="price">
  </label>`;
