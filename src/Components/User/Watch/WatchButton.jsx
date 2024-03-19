import React from 'react';
import { EyeFilled, EyeOutlined } from '@ant-design/icons';
import { FilmsIdFromWatchId_GET } from '../../Api/Api';

const WatchButton = ({
  watch,
  watchId,
  tokenUserLocal,
  films,
  userContainsFilmInWatchListId,
  userWatchedUpdate,
  userWatchedRemove,
  userWatchedCreateId,
  data,
  sizeIcons,
}) => {
  const handleWatchClick = async () => {
    if (watch) {
      const watchedIdFilms = await FilmsIdFromWatchId_GET(
        watchId,
        tokenUserLocal,
      );
      userWatchedRemove(tokenUserLocal, watchId, watchedIdFilms, films.data[0]);
    } else {
      const containsWatched = await userContainsFilmInWatchListId(
        tokenUserLocal,
      );
      if (containsWatched && watchId) {
        const watchIdFilms = await FilmsIdFromWatchId_GET(
          watchId,
          tokenUserLocal,
        );
        userWatchedUpdate(tokenUserLocal, watchId, watchIdFilms, films.data[0]);
      } else {
        const { id: idUser } = data;
        userWatchedCreateId(tokenUserLocal, films.data[0].id, idUser);
      }
    }
  };
  return (
    <div onClick={handleWatchClick}>
      {watch ? (
        <>
          <EyeFilled
            style={{
              color: '#68a512',
              fontSize: `${sizeIcons}px`,
            }}
          />
          <p className="text-slate-400">Visto</p>
        </>
      ) : (
        <>
          <EyeOutlined style={{ fontSize: `${sizeIcons}px` }} />
          <p className="text-slate-400">Ver</p>
        </>
      )}
    </div>
  );
};

export default WatchButton;
