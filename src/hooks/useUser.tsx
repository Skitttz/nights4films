import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiError } from '../api/ApiConfig';
import { fetchCurrentUser, forgotPasswordRequest, loginAndStoreToken, logoutAndClearToken, registerAndStoreToken, resetPasswordRequest } from '../controllers/userController';
import { translateErrorMessage } from '../components/Helper/Translate';
import { getCookie } from '../utils/cookieManager';
import { getTokenCookieName } from '../constants/cookies';
import { clearPrivateQueries } from '../lib/queryClient';
import type { User } from '../types/auth';

type AuthStatus = 'checking' | 'authenticated' | 'guest' | 'error';
interface UserContextType {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  userRegister: (email: string, username: string, password: string) => Promise<void>;
  userPasswordLost: (email: string) => Promise<void>;
  userPasswordReset: (code: string, password: string, passwordConfirmation: string) => Promise<void>;
  clearError: () => void;
  retrySession: () => void;
  token: string | null;
  data: User | null;
  login: boolean | null;
  status: AuthStatus;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserStorage = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => getCookie(getTokenCookieName()));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const actionPending = useRef(false);
  const authVersion = useRef(0);
  const client = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const session = useQuery({
    queryKey: ['session', token],
    queryFn: ({ signal }) => fetchCurrentUser(token!, signal),
    enabled: !!token,
    staleTime: Infinity,
  });
  const invalidSession = session.error instanceof ApiError && [401, 403].includes(session.error.status ?? 0);
  const status: AuthStatus = !token || invalidSession ? 'guest' : session.data ? 'authenticated' : session.isError ? 'error' : 'checking';
  const login = status === 'authenticated' ? true : status === 'guest' ? false : null;
  const data = status === 'authenticated' ? session.data! : null;
  const clearError = useCallback(() => setError(null), []);

  useEffect(clearError, [clearError, location.pathname]);

  const userLogout = useCallback(async () => {
    authVersion.current++;
    setToken(null);
    setError(null);
    await logoutAndClearToken();
    await clearPrivateQueries(client);
  }, [client]);

  useEffect(() => {
    if (invalidSession) void userLogout();
  }, [invalidSession, userLogout]);

  async function authenticate(request: () => Promise<{ token: string; user: User }>, propagateError: boolean) {
    if (actionPending.current) return;
    actionPending.current = true;
    setPending(true);
    setError(null);
    const version = ++authVersion.current;
    try {
      const auth = await request();
      if (authVersion.current !== version) {
        await logoutAndClearToken();
        return;
      }
      await clearPrivateQueries(client);
      if (authVersion.current !== version) {
        await logoutAndClearToken();
        return;
      }
      client.setQueryData(['session', auth.token], auth.user);
      setToken(auth.token);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from?.startsWith('/') && !from.startsWith('//') && !from.includes('\\') && !from.startsWith('/login') ? from : '/', { replace: true });
    } catch (cause) {
      const message = translateErrorMessage(cause);
      setError(message);
      if (propagateError) throw new Error(message);
    } finally {
      actionPending.current = false;
      setPending(false);
    }
  }

  async function passwordRequest(request: () => Promise<void>) {
    if (actionPending.current) return;
    actionPending.current = true;
    setPending(true);
    setError(null);
    try {
      await request();
    } catch (cause) {
      const message = translateErrorMessage(cause);
      setError(message);
      throw new Error(message);
    } finally {
      actionPending.current = false;
      setPending(false);
    }
  }

  return <UserContext.Provider value={{
    token, data, login, status,
    loading: pending || status === 'checking',
    error: error ?? (status === 'error' ? translateErrorMessage(session.error) : null),
    clearError, userLogout,
    retrySession: () => { void session.refetch(); },
    userLogin: (username, password) => authenticate(() => loginAndStoreToken(username, password), false),
    userRegister: (email, username, password) => authenticate(() => registerAndStoreToken({ email, username, password }), true),
    userPasswordLost: email => passwordRequest(() => forgotPasswordRequest(email)),
    userPasswordReset: (code, password, passwordConfirmation) => passwordRequest(() => resetPasswordRequest({ code, password, passwordConfirmation })),
  }}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext deve ser usado dentro de UserStorage.');
  return context;
}
