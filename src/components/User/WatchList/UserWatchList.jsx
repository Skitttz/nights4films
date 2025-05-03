import {
  FilmsIdFromWatchListId_GET,
  userListFilms_GET,
} from '../../../api/index';

export async function userAlreadyListedFilm(
  films,
  login,
  tokenUserLocal,
  setWatchListId,
  setWatchList,
) {
  if (login === true) {
    const watchId = await userListFilms_GET(tokenUserLocal);
    if (watchId) {
      setWatchListId(watchId);
      const watchIdFilms = await FilmsIdFromWatchListId_GET(
        watchId,
        tokenUserLocal,
      );
      const isIdFound = films
        ? watchIdFilms.some((film) => film.id === films.data[0].id)
        : false;
      if (watchId !== null && isIdFound) {
        setWatchList(true);
      } else {
        setWatchList(false);
      }
    }
  } else {
    return null;
  }
}

export async function userContainsFilmInWatchListId(tokenUserLocal) {
  const watchId = await userListFilms_GET(tokenUserLocal);
  if (watchId !== null) {
    return true;
  } else {
    return false;
  }
}
