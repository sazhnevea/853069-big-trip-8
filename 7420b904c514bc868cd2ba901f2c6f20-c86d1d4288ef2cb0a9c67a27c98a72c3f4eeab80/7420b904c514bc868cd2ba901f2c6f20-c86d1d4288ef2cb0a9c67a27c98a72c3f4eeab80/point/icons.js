const Icons = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🛳️`],
  [`Transport`, `🚊`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check-in`, `🏨`],
  [`Sightseeing`, `🏛️`],
  [`Restaurant`, `🍴`],
]);

export const getIcon = (type) =>
  `<i class="trip-icon">${Icons.get(type)}</i>`;