export const getDestinations = (destinations) => `
    <datalist id="destination-select">
    ${destinations.map(({destination}) => `
    <option value="${destination}"></option>`).join(``)}
    </datalist>`;
