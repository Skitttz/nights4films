import { getTokenCookieName } from '../constants/cookies';
import { getCurrentUser, login as loginService, register as registerService, forgotPassword, resetPassword, getProfile } from '../services/authService';
import { RegisterPayload, ResetPasswordPayload, User } from '../types/auth';
import { setCookie, removeCookie, getCookie } from '../utils/cookieManager';

export const loginAndStoreToken = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  const auth = await loginService(username, password);
  const token = auth.jwt;
  setCookie(getTokenCookieName(), token, { days: 7, path: '/', sameSite: 'Lax' });
  const user = await getCurrentUser(token);
  return { token, user };
};

export const logoutAndClearToken = async () => {
  removeCookie(getTokenCookieName(), '/');
};

export const fetchCurrentUser = async (token: string) => {
  return getCurrentUser(token);
};

export const registerUser = async (payload: RegisterPayload) => {
  await registerService(payload);
};

export const forgotPasswordRequest = async (email: string) => {
  await forgotPassword({ email });
};

export const resetPasswordRequest = async (payload: ResetPasswordPayload) => {
  await resetPassword(payload);
};

export const fetchProfile = async (token: string) => {
  return getProfile(token);
};
