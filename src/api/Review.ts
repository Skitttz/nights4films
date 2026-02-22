import { makePostRequest, makeGetRequest } from './Requests';

export const userReview_POST = (token: string, body: any) => {
  return makePostRequest('/reviews', token, body);
};

export const allReviewsbyFilmId_GET = (token: string | null, rulePagination: string, idFilm: string | number) => {
  return makeGetRequest(
    `/reviews?${rulePagination}&filters[filme][id][$eq]=${idFilm}&populate=user.avatar`,
    token,
  );
};
