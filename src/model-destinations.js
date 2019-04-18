export const ModelDestinations = class {
  constructor(data) {
    this.title = data.name;
    this.description = data.description;
    this.pictures = data.pictures || ``;
  }

  static parseDestination(data) {
    return new ModelDestinations(data);
  }

  static parseDestinations(data) {
    return data.map(ModelDestinations.parseDestination);
  }
};
