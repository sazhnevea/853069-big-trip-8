export default () => `
  <input type="radio" id="filter-everything" name="filter" value="everything" checked>
          <label class="trip-filter__item" for="filter-everything">Everything</label>

          <input type="radio" id="filter-future" name="filter" value="future">
          <label class="trip-filter__item" for="filter-future">Future</label>

          <input type="radio" id="filter-past"name="filter" value="past">
          <label class="trip-filter__item" for="filter-past">Past</label>`;
