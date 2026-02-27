import { EyeFilled, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { FilmsIdFromWatchId_GET } from '../../../api/index';

interface WatchButtonProps {
  watch: boolean;
  watchId: string;
  tokenUserLocal: string;
  films: any;
  userContainsFilmInWatchedId: (token: string) => Promise<boolean>;
  userWatchedUpdate: (token: string, idWatched: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userWatchedRemove: (token: string, idWatched: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userWatchedCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  data: any;
  sizeIcons: number;
  loading?: boolean;
}

const WatchButton = ({
  watch,
  watchId,
  tokenUserLocal,
  films,
  userContainsFilmInWatchedId,
  userWatchedUpdate,
  userWatchedRemove,
  userWatchedCreateId,
  data,
  sizeIcons,
  loading = false,
}: WatchButtonProps) => {
  const handleWatchClick = async () => {
    if (watch) {
      const watchedIdFilms = await FilmsIdFromWatchId_GET(
        watchId,
        tokenUserLocal,
      );
      userWatchedRemove(tokenUserLocal, watchId, watchedIdFilms, films.data[0]);
    } else {
      const containsWatched = await userContainsFilmInWatchedId(
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
  if (loading) {
    return (
      <div style={{ pointerEvents: 'none' }} className='py-5'>
        <LoadingOutlined style={{ fontSize: `${sizeIcons}px` }} />
      </div>
    );
  }

  return (
    <div onClick={handleWatchClick} className='flex flex-col gap-1 items-center justify-center py-2'>
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
