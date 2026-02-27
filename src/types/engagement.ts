import type { FilmEntity } from './films';
export type Id = string | number;

export type LikeCreateInput = {
  token: string;
  filmId: any;
  userId: any;
};

export type LikeUpdateInput = {
  token: string;
  likeId: Id;
  films: any[];
  newFilm: any;
};

export type LikeRemoveInput = {
  token: string;
  likeId: Id;
  films: any[];
  removeFilm: any;
};

export type ListCreateInput = {
  token: string;
  filmId: any;
  userId: any;
};

export type ListUpdateInput = {
  token: string;
  listId: Id;
  films: any[];
  newFilm: any;
};

export type ListRemoveInput = {
  token: string;
  listId: Id;
  films: any[];
  removeFilm: any;
};

export type WatchedCreateInput = {
  token: string;
  filmId: any;
  userId: any;
};

export type WatchedUpdateInput = {
  token: string;
  watchedId: Id;
  films: any[];
  newFilm: any;
};

export type WatchedRemoveInput = {
  token: string;
  watchedId: Id;
  films: any[];
  removeFilm: any;
};

export type RateCreateInput = {
  token: string;
  filmId: any;
  userId: any;
  value: number;
};

export type RateUpdateInput = {
  token: string;
  rateId: Id;
  filmId: any;
  value: number;
};

export type RateRemoveInput = {
  token: string;
  rateId: Id;
};

export type ReviewCreateInput = {
  token: string;
  userId: any;
  filmId: any;
  content: string;
  hasSpoiler: boolean;
};

export type WatchedEntity = {
  id: Id;
  attributes: WatchedAttributes;
};

export type WatchedAttributes = {
  hasWatched: boolean;
  createdAt: string;
  updatedAt: string;
  filmes: {
    data: FilmEntity[];
  };
};

export type WatchedDetailResponse = {
  data: WatchedEntity;
};
