import { makePostRequest, makeGetRequest } from './Requests';

export const uploadAvatar_POST = (bodyFormData: FormData, token: string) => {
  return makePostRequest('/upload', token, bodyFormData);
};

export const showAvatar_GET = (token: string) => {
  return makeGetRequest('/users/me?populate=avatar', token);
};
