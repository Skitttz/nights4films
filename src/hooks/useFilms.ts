import { useQuery } from '@tanstack/react-query';
import { Filmes_GET } from '../api';

export const useFilms = (currentPage: number, searchValue: string, limitItemPerPage: number) => {
  const params = new URLSearchParams({
    sort: 'id', populate: 'card',
    'pagination[start]': String((currentPage - 1) * limitItemPerPage),
    'pagination[limit]': String(limitItemPerPage),
  });
  if (searchValue) params.set('filters[title][$containsi]', searchValue);
  return useQuery({
    queryKey: ['films', currentPage, searchValue, limitItemPerPage],
    queryFn: ({ signal }) => Filmes_GET(`/filmes?${params}`, signal),
    staleTime: 5 * 60 * 1000,
    retry: false,
    placeholderData: previous => previous,
    select: data => ({ films: data, isEmpty: data.data.length === 0, totalItems: data.meta.pagination.total as number }),
  });
};

export const useFilmById = (id: string | undefined) => useQuery({
  queryKey: ['film', id],
  queryFn: ({ signal }) => Filmes_GET(`/filmes/${encodeURIComponent(id!)}?populate=card,photo_description,genres`, signal),
  enabled: !!id,
  retry: false,
});

export const useFilmBySlug = (slug: string | undefined) => useQuery({
  queryKey: ['filmBySlug', slug],
  queryFn: ({ signal }) => {
    const params = new URLSearchParams({ 'filters[slug][$eq]': slug!, populate: 'card,photo_description,genres', 'pagination[limit]': '1' });
    return Filmes_GET(`/filmes?${params}`, signal);
  },
  enabled: !!slug,
  retry: false,
});
