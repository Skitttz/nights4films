import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
} from './Requests';

// ********* Rate endpoints *********

export const FilmsIdFromRateId_GET = (rateId: string | number, token: string) => {
  return makeGetRequest<any>(`/rating-films/${rateId}?populate=filme`, token).then(
    (response) => {
      return response.data.attributes.filmes.data;
    },
  );
};

export const userRateFilms_POST = (token: string, body: any) => {
  return makePostRequest('/rating-films', token, body);
};

export const userRateFilms_GET = (token: string) => {
  return makeGetRequest<any>('/users/me?populate=rating_films.filme', token).then(
    (response) => {
      return response.rating_films.length !== 0 ? response.rating_films : null;
    },
  );
};

export const userRateFilms_PUT = (token: string, rateId: string | number, body: any) => {
  return makePutRequest(`/rating-films/${rateId}?populate=*`, token, body);
};

export const userRateFilm_DELETE = (token: string, rateId: string | number) => {
  return makeDeleteRequest(`/rating-films/${rateId}`, token);
};
