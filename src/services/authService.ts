import {
  userLogin_GET,
  userLogin_POST,
  userPasswordLost_POST,
  userPasswordReset_POST,
  userProfile_GET,
  userRegister_POST,
} from '../api/Auth';
import { AuthResponse, ForgotPasswordPayload, RegisterPayload, ResetPasswordPayload, User } from '../types/auth';

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const data = await userLogin_POST({ username, password });
  return data as AuthResponse;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  return userLogin_GET(token) as unknown as User;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const data = await userRegister_POST(payload);
  return data as AuthResponse;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<void> => {
  await userPasswordLost_POST(payload);
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<void> => {
  await userPasswordReset_POST(payload);
};

export const getProfile = async (token: string): Promise<any> => {
  return userProfile_GET(token);
};
