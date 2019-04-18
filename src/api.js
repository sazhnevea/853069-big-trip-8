import {ModelDestinations} from './model-destinations.js';
import {ModelPoints} from './model-points.js';
import {ModelOffers} from './model-offers.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();


export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getDestinationsData() {
    return this._load({url: `/destinations`})
      .then(toJSON)
      .then(ModelDestinations.parseDestinations);
  }

  getOffers() {
    return this._load({url: `/offers`})
      .then(toJSON)
      .then(ModelOffers.parseOffers);
  }


  getPoints() {
    return this._load({url: `/points`})
      .then(toJSON)
      .then(ModelPoints.parsePoints);
  }


  updatePoint({id, data}) {
    return this._load({
      url: `/points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoints.parsePoints);
  }

  deletePoint({id}) {
    return this._load({url: `/points${id}`, method: Method.DELETE});

  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`Fetch error: ${err}`);
        throw err;
      });
  }


};


// export const load = (url) => {
//   return new Promise((onSuccess, onError) => {
//     const xhr = new XMLHttpRequest();
//     xhr.resonseType = `json`;

//     xhr.addEventListener(`load`, () => {
//       if (xhr.status === 200) {
//         onSuccess(xhr.response);
//       } else {
//         onError(`Неизвестный статус: ` + xhr.status + ` ` + xhr.statusText);
//       }
//     });
//     xhr.addEventListener(`error`, () => {
//       onError(`Произошла ошибка соединения`);
//     });
//     xhr.addEventListener(`timeout`, () => {
//       onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
//     });

//     xhr.setTimeout = 10000; // 10s

//     xhr.open(`GET`, url);

//     xhr.send();
//   });
// };
