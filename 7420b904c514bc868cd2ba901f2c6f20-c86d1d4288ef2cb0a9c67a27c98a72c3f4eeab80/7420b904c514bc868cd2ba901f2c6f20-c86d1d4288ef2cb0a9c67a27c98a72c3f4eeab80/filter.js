export const getFilter = (name, isChecked = false) => {
  const filterName = name.toLowerCase();
  return `
    <input
      type="radio"
      id="filter-${filterName}"
      name="filter"
      value="${filterName}"
      ${isChecked ? ` checked` : ``}
    >
    <label
      class="trip-filter__item"
      for="filter-${filterName}">${filterName}
    </label>`;
};