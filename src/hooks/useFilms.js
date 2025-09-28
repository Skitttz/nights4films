import { useQuery } from '@tanstack/react-query';
import { Filmes_GET } from '../api/index';

export const useFilms = (currentPage, searchValue, limitItemPerPage) => {
  const startIndex = (currentPage - 1) * limitItemPerPage;

  const ruleCardItem = 'sort=id&populate=card';
  const ruleFilter = `filters[title][$containsi]=${searchValue}`;
  const rulePagination = `pagination[start]=${startIndex}&pagination[limit]=${limitItemPerPage}`;

  const searchWithFilter = `${ruleFilter}&${ruleCardItem}`;
  const pagination = `${ruleCardItem}&${rulePagination}`;

  const queryUrl =
    searchValue.length === 0
      ? `/filmes?${pagination}`
      : `/filmes?${searchWithFilter}`;

  return useQuery({
    queryKey: ['films', currentPage, searchValue],
    queryFn: () => Filmes_GET(queryUrl),
    select: (data) => ({
      films: data,
      isEmpty: data.data.length === 0,
      totalItems: data.meta.pagination.total,
    }),
  });
};

export const useFilmById = (id) => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => Filmes_GET(`/filmes/${id}?populate=*`),
    enabled: Boolean(id),
    select: (data) => data,
    staleTime: 5 * 60 * 1000,
  });
};
