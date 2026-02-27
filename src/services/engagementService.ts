import { userLikeFilms_POST, userLikeFilms_PUT } from '../api/Like';
import { userListFilms_POST, userListFilms_PUT } from '../api/Watchlist';
import { userWatchedFilms_POST, userWatchedFilms_PUT } from '../api/Watch';
import { userRateFilm_DELETE, userRateFilms_POST, userRateFilms_PUT } from '../api/Rate';
import { userReview_POST } from '../api/Review';
import {
  LikeCreateInput,
  LikeRemoveInput,
  LikeUpdateInput,
  ListCreateInput,
  ListRemoveInput,
  ListUpdateInput,
  RateCreateInput,
  RateRemoveInput,
  RateUpdateInput,
  ReviewCreateInput,
  WatchedCreateInput,
  WatchedRemoveInput,
  WatchedUpdateInput,
} from '../types/engagement';

export const likeCreate = ({ token, filmId, userId }: LikeCreateInput) => {
  return userLikeFilms_POST(token, {
    data: { hasLiked: true, filme: filmId, user: userId },
  });
};

export const likeUpdate = ({ token, likeId, films, newFilm }: LikeUpdateInput) => {
  return userLikeFilms_PUT(token, likeId, {
    data: { filme: [...films, newFilm] },
  });
};

export const likeRemove = ({ token, likeId, films, removeFilm }: LikeRemoveInput) => {
  const updated = films.filter((f: any) => f.id !== removeFilm.id);
  return userLikeFilms_PUT(token, likeId, {
    data: { filme: updated },
  });
};

export const listCreate = ({ token, filmId, userId }: ListCreateInput) => {
  return userListFilms_POST(token, {
    data: { hasEntryList: true, filmes: filmId, user: userId },
  });
};

export const listUpdate = ({ token, listId, films, newFilm }: ListUpdateInput) => {
  return userListFilms_PUT(token, listId, {
    data: { filmes: [...films, newFilm] },
  });
};

export const listRemove = ({ token, listId, films, removeFilm }: ListRemoveInput) => {
  const updated = films.filter((f: any) => f.id !== removeFilm.id);
  return userListFilms_PUT(token, listId, {
    data: { filmes: updated },
  });
};

export const watchedCreate = ({ token, filmId, userId }: WatchedCreateInput) => {
  return userWatchedFilms_POST(token, {
    data: { hasWatched: true, filmes: filmId, user: userId },
  });
};

export const watchedUpdate = ({ token, watchedId, films, newFilm }: WatchedUpdateInput) => {
  return userWatchedFilms_PUT(token, watchedId, {
    data: { filmes: [...films, newFilm] },
  });
};

export const watchedRemove = ({ token, watchedId, films, removeFilm }: WatchedRemoveInput) => {
  const updated = films.filter((f: any) => f.id !== removeFilm.id);
  return userWatchedFilms_PUT(token, watchedId, {
    data: { filmes: updated },
  });
};

export const rateCreate = ({ token, filmId, userId, value }: RateCreateInput) => {
  return userRateFilms_POST(token, {
    data: { user: userId, filme: filmId, ratingValue: value },
  });
};

export const rateUpdate = ({ token, rateId, filmId, value }: RateUpdateInput) => {
  return userRateFilms_PUT(token, rateId, {
    data: { filme: filmId, ratingValue: value },
  });
};

export const rateRemove = ({ token, rateId }: RateRemoveInput) => {
  return userRateFilm_DELETE(token, rateId);
};

export const reviewCreate = ({ token, userId, filmId, content, hasSpoiler }: ReviewCreateInput) => {
  return userReview_POST(token, {
    data: { reviewContent: content, filme: filmId, user: userId, hasSpoiler },
  });
};
