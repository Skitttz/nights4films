import { api, getAuthHeaders } from './ApiConfig';
import { makeGetRequest, makePostWithoutTokenRequest } from './Requests';

export async function userLogin_GET(token: string) {
  return await api
    .get('/users/me', getAuthHeaders(token))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function userProfile_GET(token: string) {
  return makeGetRequest(
    '/users/me?populate=reviews&populate=like_films&populate=watchlist_films.filmes&populate=watched&populate=rating_films',
    token,
  );
}

export async function userLogin_POST(userData: any) {
  return makePostWithoutTokenRequest('/auth/local', userData, null);
}

export async function userRegister_POST(userData: any) {
  return makePostWithoutTokenRequest('/auth/local/register', userData, null);
}

export async function userPasswordLost_POST(emailUser: any) {
  return makePostWithoutTokenRequest('/auth/forgot-password', emailUser, null);
}

export async function userPasswordReset_POST(body: { code: string; password: string; passwordConfirmation: string }) {
  return makePostWithoutTokenRequest('/auth/reset-password', body, null);
}
