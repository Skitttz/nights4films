import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, type Query } from '@tanstack/react-query';
import localforage from 'localforage';
import { ApiError } from '../api/ApiConfig';

const publicKeys = new Set(['films', 'film', 'filmBySlug']);
export const isPublicQuery = (query: Pick<Query, 'queryKey'>) => publicKeys.has(String(query.queryKey[0]));

export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: (count, error) => !(error instanceof ApiError && error.status && error.status < 500) && count < 1,
    },
    mutations: { retry: false },
  },
});

export const queryPersister = createAsyncStoragePersister({ storage: localforage });
export const queryPersistenceOptions = {
  persister: queryPersister,
  maxAge: 24 * 60 * 60 * 1000,
  // Discard the previous cache, which included tokens and private data.
  buster: 'public-catalog-v2',
  dehydrateOptions: { shouldDehydrateQuery: (query: Query) => isPublicQuery(query) && query.state.status === 'success' },
};

export const clearPrivateQueries = async (client: QueryClient) => {
  await client.cancelQueries({ predicate: query => !isPublicQuery(query) });
  client.removeQueries({ predicate: query => !isPublicQuery(query) });
  client.getMutationCache().clear();
};
