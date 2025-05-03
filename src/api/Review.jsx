import { makePostRequest, makeGetRequest } from './Requests';

export const userReview_POST = (token, body) => {
  return makePostRequest('/reviews', token, body);
};

export const allReviewsbyFilmId_GET = (token, rulePagination, idFilm) => {
  return makeGetRequest(
    `/reviews?${rulePagination}&filters[filme][id][$eq]=${idFilm}&populate=user.avatar`,
    token,
  );
};
