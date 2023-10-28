import { FilmsIdFromLikeId_GET, userLikeFilms_GET } from '../../Api/Api';

export async function userAlreadyLiked(
  films,
  login,
  tokenUserLocal,
  setLikedId,
  setLiked,
) {
  if (login === true) {
    const likeId = await userLikeFilms_GET(tokenUserLocal);
    if (likeId) {
      setLikedId(likeId);
      const likeIdFilms = await FilmsIdFromLikeId_GET(likeId, tokenUserLocal);
      const isIdFound = films
        ? likeIdFilms.some((film) => film.id === films.data[0].id)
        : false;
      if (likeId !== null && isIdFound) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  } else {
    return null;
  }
}

export async function userContainsLikeId(tokenUserLocal) {
  const likeId = await userLikeFilms_GET(tokenUserLocal);
  if (likeId !== null) {
    return true;
  } else {
    return false;
  }
}
