import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* Watch endpoints *********

export const FilmsIdFromWatchId_GET = async (watchId, token) => {
  return makeGetRequest(`/watcheds/${watchId}?populate=filmes`, token).then(
    (response) => {
      return response.data.attributes.filmes.data || null;
    },
  );
};

export const userWatchedFilms_POST = async (token, body) => {
  return makePostRequest('/watcheds', token, body);
};

export const userWatchedFilms_GET = async (token) => {
  return makeGetRequest('/users/me/?populate=watched', token).then(
    (response) => {
      return response.watched !== null ? response.watched.id : null;
    },
  );
};

export const userWatchedFilms_PUT = async (token, watchedId, body) => {
  return makePutRequest(`/watcheds/${watchedId}?populate=*`, token, body);
};
