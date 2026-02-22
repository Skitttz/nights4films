import {
  FilmsIdFromWatchListId_GET,
  userListFilms_GET,
} from '../../../api/index';

export async function userAlreadyListedFilm(
  films: any,
  login: boolean | null,
  tokenUserLocal: string,
  setWatchListId: (id: string) => void,
  setWatchList: (value: boolean) => void,
) {
  if (login === true) {
    const watchId = await userListFilms_GET(tokenUserLocal);
    if (watchId) {
      setWatchListId(watchId);
      const watchIdFilms = await FilmsIdFromWatchListId_GET(
        watchId,
        tokenUserLocal,
      );
      const targetId = films?.data?.[0]?.id;
      const isIdFound =
        Array.isArray(watchIdFilms) && targetId != null
          ? watchIdFilms.some((film: any) => film.id === targetId)
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

export async function userContainsFilmInWatchListId(tokenUserLocal: string) {
  const watchId = await userListFilms_GET(tokenUserLocal);
  if (watchId !== null) {
    return true;
  } else {
    return false;
  }
}
