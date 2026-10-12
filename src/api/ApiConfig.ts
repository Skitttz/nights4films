import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20_000,
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

export class ApiError extends Error {
  constructor(message: string, readonly status?: number, readonly code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError || axios.isCancel(error)) throw error;
  if (!axios.isAxiosError<StrapiErrorResponse>(error)) {
    throw new ApiError(error instanceof Error ? error.message : String(error));
  }
  const err = error.response?.data?.error;
  const details =
    typeof err?.details === 'string' && err.details.trim().length ? err.details.trim() : null;
  const message =
    typeof err?.message === 'string' && err.message.trim().length ? err.message.trim() : null;
  const fallback = error.code === 'ECONNABORTED'
    ? 'A solicitação demorou mais que o esperado. Tente novamente.'
    : !error.response ? 'Não foi possível conectar ao servidor. Tente novamente.' : error.message;
  throw new ApiError(details ?? message ?? fallback, error.response?.status, error.code);
};

export const makeRequest = async <TResponse>(
  method: AxiosRequestConfig["method"],
  url: string,
  token: string | null = null,
  data?: unknown,
  signal?: AbortSignal,
): Promise<TResponse> => {
  const headers = token ? getAuthHeaders(token) : {};

  try {
    const response = await api.request<TResponse>({
      method,
      url,
      data,
      signal,
      ...headers,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
