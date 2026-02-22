import {
  FilmsIdFromWatchId_GET,
  userWatchedFilms_GET,
} from '../../../api/index';

export async function userAlreadyWatchedFilm(
  films: any,
  login: boolean | null,
  tokenUserLocal: string,
  setWatchedId: (id: string) => void,
  setWatched: (watched: boolean) => void,
) {
  if (login === true) {
    const watchId = await userWatchedFilms_GET(tokenUserLocal);
    if (watchId) {
      setWatchedId(watchId);
      const watchIdFilms = await FilmsIdFromWatchId_GET(
        watchId,
        tokenUserLocal,
      );
      const targetId = films?.data?.[0]?.id;
      const isIdFound =
        Array.isArray(watchIdFilms) && targetId != null
          ? watchIdFilms.some((film: any) => film.id === targetId)
          : false;
      if (watchId !== null && isIdFound) {
        setWatched(true);
      } else {
        setWatched(false);
      }
    }
  } else {
    return null;
  }
}

export async function userContainsFilmInWatchedId(tokenUserLocal: string) {
  const watchId = await userWatchedFilms_GET(tokenUserLocal);
  if (watchId !== null) {
    return true;
  } else {
    return false;
  }
}
