import React from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import { FilmsIdFromWatchListId_GET } from '../../../Api/index';

function WatchListButton({
  watchList,
  watchListId,
  tokenUserLocal,
  films,
  userContainsFilmInWatchListId,
  userListFilmUpdate,
  userListFilmRemove,
  userListFilmCreateId,
  data,
  sizeIcons,
}) {
  const handleWatchListClick = async () => {
    if (watchList) {
      const watchIdFilms = await FilmsIdFromWatchListId_GET(
        watchListId,
        tokenUserLocal,
      );
      userListFilmRemove(
        tokenUserLocal,
        watchListId,
        watchIdFilms,
        films.data[0],
      );
    } else {
      const containsWatchList = await userContainsFilmInWatchListId(
        tokenUserLocal,
      );
      if (containsWatchList && watchListId) {
        const watchIdFilms = await FilmsIdFromWatchListId_GET(
          watchListId,
          tokenUserLocal,
        );
        userListFilmUpdate(
          tokenUserLocal,
          watchListId,
          watchIdFilms,
          films.data[0],
        );
      } else {
        const { id: idUser } = data;
        userListFilmCreateId(tokenUserLocal, films.data[0].id, idUser);
      }
    }
  };

  return (
    <div onClick={handleWatchListClick}>
      {watchList ? (
        <>
          <FieldTimeOutlined
            style={{
              color: '#b6ed12',
              fontSize: `${sizeIcons}px`,
            }}
          />
          <p className="text-slate-400">Adicionado</p>
        </>
      ) : (
        <>
          <FieldTimeOutlined style={{ fontSize: `${sizeIcons}px` }} />
          <p className="text-slate-400">Assistir Depois</p>
        </>
      )}
    </div>
  );
}

export default WatchListButton;
