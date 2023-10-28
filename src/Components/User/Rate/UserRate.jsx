import { userRateFilms_GET } from '../../Api/Api';

export async function userAlreadyRatedFilm(
  films,
  login,
  tokenUserLocal,
  setRateId,
  setRate,
) {
  let AllRatingsUser = [];
  if (login === true) {
    const data = await userRateFilms_GET(tokenUserLocal);
    if (data !== undefined && data !== null) {
      AllRatingsUser = [...data];
      const existRatingIdForFilmId = AllRatingsUser.filter(
        (film) => film.filme !== null && film.filme.id === films.data[0].id,
      );
      if (existRatingIdForFilmId.length !== 0) {
        setRate(existRatingIdForFilmId[0].ratingValue);
        setRateId(existRatingIdForFilmId[0].id);
        return true;
      } else {
        return null;
      }
    }
    return null;
  } else {
    return null;
  }
}
