export const getImages = (images) =>
  `<div class="point__destination-images">
   ${images.map(({description, src}) =>
    `<img src="${src}" alt="${description}" class="point__destination-image">`).join(``)}
   </div>`;
