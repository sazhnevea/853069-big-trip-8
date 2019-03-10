export const getOffersMarkup = (offers) => {
  let offerArr = ``;
  [...offers].map((offer) => {
    offerArr += `<li>
    <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
  </li>`;
  });
  return offerArr;
};
