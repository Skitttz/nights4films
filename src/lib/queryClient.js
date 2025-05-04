import { QueryClient } from '@tanstack/react-query';

/**
 *
 * @returns {QueryClient} Instância configurada do QueryClient
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};
