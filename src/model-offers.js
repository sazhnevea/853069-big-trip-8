export const ModelOffers = class {
  constructor(data) {
    this.type = data.type;
    this.offers = this.setOffers(data.offers);
  }

  setOffers(offers) {
    const modelOffers = [];
    offers.map(({name, price}) => {
      modelOffers.push({title: name, price, accepted: false});
    });
    return modelOffers;
  }

  static parseOffer(data) {
    return new ModelOffers(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffers.parseOffer);
  }
};
