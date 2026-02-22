import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* WatchList endpoints *********

export const FilmsIdFromWatchListId_GET = async (watchListId: string | number, token: string) => {
  return makeGetRequest<any>(
    `/watchlist-films/${watchListId}?populate=filmes.card`,
    token,
  ).then((response) => {
    return response.data.attributes.filmes.data;
  });
};

export const userListFilms_POST = async (token: string, body: any) => {
  return makePostRequest('/watchlist-films', token, body);
};

export const userListFilms_GET = async (token: string) => {
  return makeGetRequest<any>('/users/me/?populate=watchlist_films', token).then(
    (response) => {
      return response.watchlist_films.id !== null
        ? response.watchlist_films.id
        : null;
    },
  );
};

export const userListFilms_PUT = async (token: string, watchListId: string | number, body: any) => {
  return makePutRequest(
    `/watchlist-films/${watchListId}?populate=*`,
    token,
    body,
  );
};
