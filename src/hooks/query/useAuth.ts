import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfile, forgotPasswordRequest, loginAndStoreToken, registerUser, resetPasswordRequest } from '../../controllers/userController';
import { RegisterPayload, ResetPasswordPayload } from '../../types/auth';

export const useLoginMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      loginAndStoreToken(username, password),
    onSuccess: ({ token }) => {
      qc.invalidateQueries({ queryKey: ['profile', token] });
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPasswordRequest(email),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordRequest(payload),
  });
};

export const useProfileQuery = (token: string | null) => {
  return useQuery({
    queryKey: ['profile', token],
    queryFn: () => fetchProfile(token as string),
    enabled: !!token,
  });
};
