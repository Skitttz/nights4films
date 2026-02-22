import { useQuery } from "@tanstack/react-query";
import { Filmes_GET } from "../api";

type FilmsResponse = any;

type UseFilmsResult = {
  films: FilmsResponse;
  isEmpty: boolean;
  totalItems: number;
};

export const useFilms = (
  currentPage: number,
  searchValue: string,
  limitItemPerPage: number
) => {
  const startIndex = (currentPage - 1) * limitItemPerPage;

  const ruleCardItem = "sort=id&populate=card";
  const ruleFilter = `filters[title][$containsi]=${searchValue}`;
  const rulePagination = `pagination[start]=${startIndex}&pagination[limit]=${limitItemPerPage}`;

  const searchWithFilter = `${ruleFilter}&${ruleCardItem}`;
  const pagination = `${ruleCardItem}&${rulePagination}`;

  const queryUrl =
    searchValue.length === 0 ? `/filmes?${pagination}` : `/filmes?${searchWithFilter}`;

  return useQuery<FilmsResponse, Error, UseFilmsResult>({
    queryKey: ["films", currentPage, searchValue],
    queryFn: () => Filmes_GET(queryUrl),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev as any,
    select: (data: FilmsResponse): UseFilmsResult => ({
      films: data,
      isEmpty: data.data.length === 0,
      totalItems: data.meta.pagination.total,
    }),
  });
};

type FilmResponse = any;

export const useFilmById = (id: string | undefined) => {
  return useQuery<FilmResponse>({
    queryKey: ["film", id],
    queryFn: () => Filmes_GET(`/filmes/${id}?populate=*`),
    enabled: Boolean(id),
    select: (data: FilmResponse) => data,
    staleTime: 5 * 60 * 1000,
  });
};
