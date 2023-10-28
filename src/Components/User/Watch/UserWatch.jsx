import { FilmsIdFromWatchId_GET, userWatchedFilms_GET } from '../../Api/Api';

export async function userAlreadyWatchedFilm(
  films,
  login,
  tokenUserLocal,
  setWatchedId,
  setWatched,
) {
  if (login === true) {
    const watchId = await userWatchedFilms_GET(tokenUserLocal);
    if (watchId) {
      setWatchedId(watchId);
      const watchIdFilms = await FilmsIdFromWatchId_GET(
        watchId,
        tokenUserLocal,
      );
      const isIdFound = films
        ? watchIdFilms.some((film) => film.id === films.data[0].id)
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

export async function userContainsFilmInWatchedId(tokenUserLocal) {
  const watchId = await userWatchedFilms_GET(tokenUserLocal);
  if (watchId !== null) {
    return true;
  } else {
    return false;
  }
}
