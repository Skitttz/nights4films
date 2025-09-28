import { QueryClient } from '@tanstack/react-query';
import {
  createAsyncStoragePersister,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import localforage from 'localforage';

/**
 *
 * @returns {QueryClient} Instance QueryClient with IndexedDB (via localforage)

 */
export const createQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 24 * 60 * 60 * 1000,
      },
      mutations: {
        retry: 1,
      },
    },
  });

  const persister = createAsyncStoragePersister({
    storage: localforage,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 24 * 60 * 60 * 1000, // 24h
  });

  return queryClient;
};
