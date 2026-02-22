import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* Like endpoints *********

export const userLikeFilms_POST = (token: string, body: any) => {
  return makePostRequest('/like-films', token, body);
};

export const userLikeFilms_GET = async (token: string) => {
  const { like_films } = await makeGetRequest<any>(
    '/users/me/?populate=like_films',
    token,
  );
  return like_films.length !== 0 ? like_films[0].id : null;
};

export const FilmsIdFromLikeId_GET = (likeId: string | number, token: string) => {
  return makeGetRequest<any>(`/like-films/${likeId}?populate=filme`, token).then(
    (response) => {
      return response.data.attributes.filme.data || null;
    },
  );
};

export const userLikeFilms_PUT = (token: string, idLike: string | number, body: any) => {
  return makePutRequest(`/like-films/${idLike}`, token, body);
};
