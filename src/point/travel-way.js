const getChecked = (defaultData, userData) =>
  (defaultData === userData) && `checked`;

export const getTravelWay = (way) => `
  <div class="travel-way__select">
    <div class="travel-way__select-group">
      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-taxi"
      name="travel-way"
      value="taxi" 
      ${getChecked(`Taxi`, way)}
      >

      <label
      class="travel-way__select-label"
      for="travel-way-taxi">🚕 taxi</label>

      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-bus"
      name="travel-way"
      value="bus"
      ${getChecked(`Bus`, way)}
      >

      <label
      class="travel-way__select-label"
      for="travel-way-bus">🚌 bus</label>

      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-train"
      name="travel-way"
      value="train"
      ${getChecked(`Train`, way)}
      >

      <label
      class="travel-way__select-label"
      for="travel-way-train">🚂 train</label>

      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-flight"
      name="travel-way"
      value="train"
      ${getChecked(`Flight`, way)}
      >

      <label
      class="travel-way__select-label"
      for="travel-way-flight">✈️ flight</label>
    </div>

    <div class="travel-way__select-group">
      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-check-in
       name="travel-way"
       value="check-in"
       ${getChecked(`Check-in`, way)}
       >

      <label
      class="travel-way__select-label"
      for="travel-way-check-in">🏨 check-in</label>

      <input
      class="travel-way__select-input visually-hidden"
      type="radio"
      id="travel-way-sightseeing"
      name="travel-way"
      value="sight-seeing"
      ${getChecked(`Check-in`, way)}
      >
      
      <label
      class="travel-way__select-label"
      for="travel-way-sightseeing">🏛 sightseeing</label>
    </div>
  </div>`;
