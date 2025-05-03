import { api, getAuthHeaders } from './ApiConfig';
import { makeGetRequest, makePostWithoutTokenRequest } from './Requests';

export async function userLogin_GET(token) {
  return await api
    .get('/users/me', getAuthHeaders(token))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function userProfile_GET(token) {
  return makeGetRequest(
    '/users/me?populate=reviews&populate=like_films&populate=watchlist_films.filmes&populate=watched&populate=rating_films',
    token,
  );
}

export async function userLogin_POST(userData) {
  return makePostWithoutTokenRequest('/auth/local', userData, null);
}

export async function userRegister_POST(userData) {
  return makePostWithoutTokenRequest('/auth/local/register', userData, null);
}

export async function userPasswordLost_POST(emailUser) {
  return makePostWithoutTokenRequest('/auth/forgot-password', emailUse, nullr);
}
