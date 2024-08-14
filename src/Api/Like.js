import { makeGetRequest, makePostRequest, makePutRequest } from './Requests';

// ********* Like endpoints *********

export const userLikeFilms_POST = (token, body) => {
  return makePostRequest('/like-films', token, body);
};

export const userLikeFilms_GET = async (token) => {
  const { like_films } = await makeGetRequest(
    '/users/me/?populate=like_films',
    token,
  );
  return like_films.length !== 0 ? like_films[0].id : null;
};

export const FilmsIdFromLikeId_GET = (likeId, token) => {
  return makeGetRequest(`/like-films/${likeId}?populate=filme`, token).then(
    (response) => {
      return response.data.attributes.filme.data || null;
    },
  );
};

export const userLikeFilms_PUT = (token, idLike, body) => {
  return makePutRequest(`/like-films/${idLike}`, token, body);
};
