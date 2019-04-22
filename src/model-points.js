export const ModelPoints = class {
  constructor(data) {
    this.price = data.base_price;
    this.time = this.formatTime(data.date_from, data.date_to);
    this.destination = data.destination.name;
    this.description = data.destination.description || ``;
    this.pictures = data.destination.pictures || ``;
    this.id = data.id;
    this.isFavorite = data.is_favorite || false;
    this.offers = data.offers || ``;
    this.type = data.type;
  }

  toRAW() {
    return {
      'destination': {description: this.description, name: this.destination, pictures: this.pictures},
      'base_price': this.price,
      'date_from': this.time.start,
      'date_to': this.time.end,
      'id': this.id,
      'is_favorite': this.isFavorite,
      'type': this.type,
      'offers': this.offers,
    };
  }

  formatTime(from, to) {
    return {start: from,
      end: to,
    };
  }

  static parsePoint(data) {
    return new ModelPoints(data);
  }

  static parsePoints(data) {
    if (data.length) {
      return data.map(ModelPoints.parsePoint);
    } else {
      return ModelPoints.parsePoint(data);
    }
  }
};
