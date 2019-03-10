export default (filterName) => `
  <input
    type="radio"
    id="filter-${filterName}"
    name="filter"
    value="${filterName}"
  >
  <label
    class="trip-filter__item"
    for="filter-${filterName}">${filterName}
  </label>`;

// const nameLowerCase = name.toLowerCase();
// const lowerName = name.toLowerCase();