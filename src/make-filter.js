export default (caption, checked = false) => `
  <input type="radio" id="filter-everything" name="filter" value="everything" ${checked}>
  <label class="trip-filter__item" for="filter-everything">${caption}</label>`;
