import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* Watch endpoints *********

export const FilmsIdFromWatchId_GET = (watchId, token) => {
  return makeGetRequest(`/watcheds/${watchId}?populate=filmes`, token).then(
    (response) => {
      return response.data.attributes.filmes.data || null;
    },
  );
};

export const userWatchedFilms_POST = (token, body) => {
  return makePostRequest('/watcheds', token, body);
};

export const userWatchedFilms_GET = (token) => {
  return makeGetRequest('/users/me/?populate=watched', token).then(
    (response) => {
      return response.watched !== null ? response.watched.id : null;
    },
  );
};

export const userWatchedFilms_PUT = (token, watchedId, body) => {
  return makePutRequest(`/watcheds/${watchedId}?populate=*`, token, body);
};
