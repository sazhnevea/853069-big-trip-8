import {offers as offersArray} from "./mock-constants";
import {getFewValues, getRandomInteger} from "../utils";

const MAX_OFFER_PRICE = 50;
const MIN_OFFER_PRICE = 5;
const MAX_QTY_OFFERS = 2;
const MIN_QTY_OFFERS = 0;

export const getOffers = () => {
  const offers = getFewValues(offersArray, MIN_QTY_OFFERS, MAX_QTY_OFFERS);
  offers.forEach((offer, index) => {
    const offerItem = {
      name: offer,
      price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
    };
    offers[index] = offerItem;
  });
  return offers;
};
