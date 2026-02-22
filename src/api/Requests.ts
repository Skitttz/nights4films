import { makeRequest } from './ApiConfig';

export const makeGetRequest = async <T = any>(url: string, token: string | null): Promise<T> => {
  return makeRequest('get', url, token);
};

export const makeDeleteRequest = async <T = any>(url: string, token: string | null): Promise<T> => {
  return makeRequest('delete', url, token);
};

export const makePostWithoutTokenRequest = async <T = any>(url: string, body: any, token: string | null = null): Promise<T> => {
  return makeRequest('post', url, token, body);
};

export const makePostRequest = async <T = any>(url: string, token: string | null, body: any): Promise<T> => {
  return makeRequest('post', url, token, body);
};

export const makePutRequest = async <T = any>(url: string, token: string | null, body: any): Promise<T> => {
  return makeRequest('put', url, token, body);
};
