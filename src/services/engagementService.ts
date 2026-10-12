import { makePostRequest, makePutRequest, makeDeleteRequest } from '../api/Requests';
import type { UserProfile } from '../types/auth';
import type { Id } from '../types/engagement';

export type EngagementAction = { type: 'like' | 'watchlist' | 'watched' } | { type: 'rate'; value: number };

export async function updateFilmEngagement(token: string, userId: number, filmId: Id, profile: UserProfile, action: EngagementAction) {
  if (action.type === 'rate') {
    const rating = profile.rating_films?.find(item => String(item.filme?.id) === String(filmId));
    if (action.value === 0) {
      if (rating) await makeDeleteRequest(`/rating-films/${rating.id}`, token);
      return;
    }
    if (!Number.isFinite(action.value) || action.value < 0.5 || action.value > 5 || action.value * 2 % 1 !== 0) throw new Error('Avaliação inválida.');
    const data = { filme: filmId, ratingValue: action.value };
    if (rating) return makePutRequest(`/rating-films/${rating.id}`, token, { data });
    return makePostRequest('/rating-films', token, { data: { ...data, user: userId } });
  }

  const likes = profile.like_films ?? [];
  const like = likes.find(item => item.filme?.some(film => String(film.id) === String(filmId))) ?? likes[0];
  const config = action.type === 'like'
    ? { endpoint: 'like-films', collection: like, films: like?.filme, relation: 'filme', flag: 'hasLiked' }
    : action.type === 'watchlist'
      ? { endpoint: 'watchlist-films', collection: profile.watchlist_films, films: profile.watchlist_films?.filmes, relation: 'filmes', flag: 'hasEntryList' }
      : { endpoint: 'watcheds', collection: profile.watched, films: profile.watched?.filmes, relation: 'filmes', flag: 'hasWatched' };
  const active = config.films?.some(film => String(film.id) === String(filmId)) ?? false;
  if (config.collection) {
    return makePutRequest(`/${config.endpoint}/${config.collection.id}`, token, {
      data: { [config.relation]: { [active ? 'disconnect' : 'connect']: [filmId] } },
    });
  }
  return makePostRequest(`/${config.endpoint}`, token, {
    data: { [config.flag]: true, [config.relation]: [filmId], user: userId },
  });
}

export const reviewCreate = ({ token, userId, filmId, content, hasSpoiler }: {
  token: string; userId: number; filmId: Id; content: string; hasSpoiler: boolean;
}) => makePostRequest('/reviews', token, {
  data: { reviewContent: content.trim(), filme: filmId, user: userId, hasSpoiler },
});
