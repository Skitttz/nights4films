import { FilmsIdFromLikeId_GET, userLikeFilms_GET } from '../../../api/index';

export async function userAlreadyLiked(
  films: any,
  login: boolean | null,
  tokenUserLocal: string,
  setLikedId: (id: string) => void,
  setLiked: (liked: boolean) => void,
) {
  if (login === true) {
    const likeId = await userLikeFilms_GET(tokenUserLocal);
    if (likeId) {
      setLikedId(likeId);
      const likeIdFilms = await FilmsIdFromLikeId_GET(likeId, tokenUserLocal);
      const targetId = films?.data?.[0]?.id;
      const isIdFound =
        Array.isArray(likeIdFilms) && targetId != null
          ? likeIdFilms.some((film: any) => film.id === targetId)
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

export async function userContainsLikeId(tokenUserLocal: string) {
  const likeId = await userLikeFilms_GET(tokenUserLocal);
  if (likeId !== null) {
    return true;
  } else {
    return false;
  }
}
