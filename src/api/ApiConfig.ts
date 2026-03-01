import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type AuthHeaders = {
  headers: {
    Authorization: string;
  };
};

export const getAuthHeaders = (token: string | null): AuthHeaders | {} => {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

type StrapiErrorResponse = {
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: unknown;
  };
};

export const handleApiError = (
  error: AxiosError<StrapiErrorResponse>
): never => {
  const err = error.response?.data?.error;
  const details =
    typeof err?.details === 'string' && err.details.trim().length ? err.details.trim() : null;
  const message =
    typeof err?.message === 'string' && err.message.trim().length ? err.message.trim() : null;
  throw details ?? message ?? error.message ?? 'Erro na requisição';
};

export const makeRequest = async <TResponse>(
  method: AxiosRequestConfig["method"],
  url: string,
  token: string | null = null,
  data?: unknown
): Promise<TResponse> => {
  const headers = token ? getAuthHeaders(token) : {};

  try {
    const response = await api.request<TResponse>({
      method,
      url,
      data,
      ...headers,
    });

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError<StrapiErrorResponse>);
    throw error as Error;
  }
};
