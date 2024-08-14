import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* WatchList endpoints *********

export const FilmsIdFromWatchListId_GET = (watchListId, token) => {
  return makeGetRequest(
    `/watchlist-films/${watchListId}?populate=filmes.card`,
    token,
  ).then((response) => {
    return response.data.attributes.filmes.data;
  });
};

export const userListFilms_POST = (token, body) => {
  return makePostRequest('/watchlist-films', token, body);
};

export const userListFilms_GET = (token) => {
  return makeGetRequest('/users/me/?populate=watchlist_films', token).then(
    (response) => {
      return response.watchlist_films.id !== null
        ? response.watchlist_films.id
        : null;
    },
  );
};

export const userListFilms_PUT = (token, watchListId, body) => {
  return makePutRequest(
    `/watchlist-films/${watchListId}?populate=*`,
    token,
    body,
  );
};
