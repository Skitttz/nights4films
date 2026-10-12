import { makeGetRequest, makePostWithoutTokenRequest } from './Requests';
import type { UserProfile } from '../types/auth';

export async function userLogin_GET(token: string, signal?: AbortSignal) {
  return makeGetRequest('/users/me', token, signal);
}

export async function userProfile_GET(token: string, signal?: AbortSignal) {
  const populate = new URLSearchParams({
    'populate[avatar]': 'true',
    'populate[like_films][populate][filme]': 'true',
    'populate[watchlist_films][populate][filmes][populate][card]': 'true',
    'populate[watched][populate][filmes]': 'true',
    'populate[rating_films][populate][filme]': 'true',
  });
  return makeGetRequest<UserProfile>(
    `/users/me?${populate}`,
    token,
    signal,
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
