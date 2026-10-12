import { getTokenCookieName } from '../constants/cookies';
import { getCurrentUser, login as loginService, register as registerService, forgotPassword, resetPassword, getProfile } from '../services/authService';
import { RegisterPayload, ResetPasswordPayload, User } from '../types/auth';
import { setCookie, removeCookie } from '../utils/cookieManager';

export const loginAndStoreToken = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  const auth = await loginService(username, password);
  const token = auth.jwt;
  if (!token) throw new Error('Resposta inválida do servidor (JWT ausente).');
  const user = auth.user?.id ? auth.user : await getCurrentUser(token);
  setCookie(getTokenCookieName(), token, { days: 7, path: '/', sameSite: 'Lax' });
  return { token, user };
};

export const logoutAndClearToken = async () => {
  removeCookie(getTokenCookieName(), '/');
};

export const fetchCurrentUser = async (token: string, signal?: AbortSignal) => {
  return getCurrentUser(token, signal);
};

export const registerUser = async (payload: RegisterPayload) => {
  await registerService(payload);
};

export const registerAndStoreToken = async (payload: RegisterPayload): Promise<{ token: string; user: User }> => {
  const auth = await registerService(payload);
  const token = auth?.jwt;
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw new Error('Resposta inválida do servidor (JWT ausente).');
  }
  const user = auth.user?.id ? auth.user : await getCurrentUser(token);
  setCookie(getTokenCookieName(), token, { days: 7, path: '/', sameSite: 'Lax' });
  return { token, user };
};

export const forgotPasswordRequest = async (email: string) => {
  await forgotPassword({ email });
};

export const resetPasswordRequest = async (payload: ResetPasswordPayload) => {
  await resetPassword(payload);
};

export const fetchProfile = async (token: string, signal?: AbortSignal) => {
  return getProfile(token, signal);
};
