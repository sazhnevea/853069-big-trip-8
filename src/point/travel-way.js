import {Icons} from '../travel-types.js';
import {types} from '../mock/data-point.js';

const getChecked = (defaultData, userData) => {
  const defaultType = defaultData[0].toLowerCase();
  return (defaultType === userData) && `checked`;
};

const getIcon = (value) => {
  return Icons.get(value);
};

export const getTravelType = (type) =>
  `<div class="travel-way">
    <label class="travel-way__label" for="travel-way__toggle">${getIcon(type)}</label>
    <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
    <div class="travel-way__select">
      <div class="travel-way__select-group">
        ${types.map((item) => `
          <input
          class="travel-way__select-input visually-hidden"
          type="radio"
          id="travel-way-${item[0]}"
          name="travel-way"
          value="${item[0]}" 
          ${getChecked(item, type)}
          >
         <label
         class="travel-way__select-label"
          for="travel-way-${item[0]}">${item[1]} ${item[0]}</label>
         `).join(``)}
      </div>
    </div>
  </div>`;
