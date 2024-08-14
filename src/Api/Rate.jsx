import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
} from './Requests';

// ********* Rate endpoints *********

export const FilmsIdFromRateId_GET = (rateId, token) => {
  return makeGetRequest(`/rating-films/${rateId}?populate=filme`, token).then(
    (response) => {
      return response.data.attributes.filmes.data;
    },
  );
};

export const userRateFilms_POST = (token, body) => {
  return makePostRequest('/rating-films', token, body);
};

export const userRateFilms_GET = (token) => {
  return makeGetRequest('/users/me?populate=rating_films.filme', token).then(
    (response) => {
      return response.rating_films.length !== 0 ? response.rating_films : null;
    },
  );
};

export const userRateFilms_PUT = (token, rateId, body) => {
  return makePutRequest(`/rating-films/${rateId}?populate=*`, token, body);
};

export const userRateFilm_DELETE = (token, rateId) => {
  return makeDeleteRequest(`/rating-films/${rateId}`, token);
};
