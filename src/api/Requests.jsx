import { makeRequest } from './ApiConfig';

export const makeGetRequest = async (url, token) => {
  return makeRequest('get', url, token);
};

export const makeDeleteRequest = async (url, token) => {
  return makeRequest('delete', url, token);
};

export const makePostWithoutTokenRequest = async (url, body, token = null) => {
  return makeRequest('post', url, token, body);
};

export const makePostRequest = async (url, token, body) => {
  return makeRequest('post', url, token, body);
};

export const makePutRequest = async (url, token, body) => {
  return makeRequest('put', url, token, body);
};
