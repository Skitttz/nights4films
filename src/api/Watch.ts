import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* Watch endpoints *********

export const FilmsIdFromWatchId_GET = async (watchId: string | number, token: string) => {
  return makeGetRequest<any>(`/watcheds/${watchId}?populate=filmes`, token).then(
    (response) => {
      return response.data.attributes.filmes.data || null;
    },
  );
};

export const userWatchedFilms_POST = async (token: string, body: any) => {
  return makePostRequest('/watcheds', token, body);
};

export const userWatchedFilms_GET = async (token: string) => {
  return makeGetRequest<any>('/users/me/?populate=watched', token).then(
    (response) => {
      return response.watched !== null ? response.watched.id : null;
    },
  );
};

export const userWatchedFilms_PUT = async (token: string, watchedId: string | number, body: any) => {
  return makePutRequest(`/watcheds/${watchedId}?populate=*`, token, body);
};
