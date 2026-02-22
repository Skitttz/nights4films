import { userRateFilms_GET } from '../../../api/index';

export async function userAlreadyRatedFilm(
  films: any,
  login: boolean | null,
  tokenUserLocal: string,
  setRateId: (id: string) => void,
  setRate: (rate: number) => void,
) {
  let AllRatingsUser: any[] = [];
  if (login === true) {
    const data = await userRateFilms_GET(tokenUserLocal);
    if (data !== undefined && data !== null) {
      AllRatingsUser = [...data];
      const existRatingIdForFilmId = AllRatingsUser.filter(
        (film: any) => film.filme !== null && film.filme.id === films.data[0].id,
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
