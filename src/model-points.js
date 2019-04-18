export const ModelPoints = class {
  constructor(data) {
    this.price = data.base_price;
    this.time = this.formatTime(data.date_from, data.date_to);
    this.destination = data.destination.name;
    this.description = data.destination.description || ``;
    this.picture = data.destination.pictures || ``;
    this.id = data.id;
    this.isFaforite = data.is_favorite || false;
    this.offers = data.offers || ``;
    this.type = data.type;
  }

  toRAW() {
    return {
      'destination': {description: this.description, name: this.destination},
      'base_price': this.price,
      'date_from': this.time.start,
      'date_to': this.time.end,
      'id': this.id,
      'is_favorite': this.isFavorite,
      'type': this.type,
    };
  }

  formatTime(from, to) {
    return {start: from,
      end: to,
    };
  }

  static parsePoint(data) {
    console.log();
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
