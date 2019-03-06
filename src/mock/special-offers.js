export const getSpecialOffersString = (offers) => {
  let offersString = ``;
  offers.forEach((offer) => {
    offersString += `<li>
    <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
  </li>`;
  });
  return offersString;
};
