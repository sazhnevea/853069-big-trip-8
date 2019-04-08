import {types} from '../mock/data-point.js';

const getChecked = (defaultData, userData) =>
  (defaultData === userData) && `checked`;

const getIcon = (value) => {
  let icon = ``;
  types.forEach((type) => {
    if (type[0] === value) {
      icon = type[1];
    }
  });
  return icon;
};

export const getTravelWay = (way) => `
  <div class="travel-way">
    <label class="travel-way__label" for="travel-way__toggle">${getIcon(way)}</label>
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
          ${getChecked(item, way)}
          >

         <label
         class="travel-way__select-label"
          for="travel-way-${item[0]}">${item[1]} ${item[0]}</label>
         `)};
      </div>
    </div>
  </div>`;
