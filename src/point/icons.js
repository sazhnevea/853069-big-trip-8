import {Icons} from '../travel-types.js';

export const getIcon = (type) =>
  `<i class="trip-icon">${Icons.get(type)}</i>`;
