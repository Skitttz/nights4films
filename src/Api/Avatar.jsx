import { makePostRequest, makeGetRequest } from './Requests';

export const uploadAvatar_POST = (bodyFormData, token) => {
  return makePostRequest('/upload', token, bodyFormData);
};

export const showAvatar_GET = (token) => {
  return makeGetRequest('/users/me?populate=avatar', token);
};
