import { FieldTimeOutlined, LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { FilmsIdFromWatchListId_GET } from '../../../api/index';

interface WatchListButtonProps {
  watchList: boolean;
  watchListId: string;
  tokenUserLocal: string;
  films: any;
  userContainsFilmInWatchListId: (token: string) => Promise<boolean>;
  userListFilmUpdate: (token: string, idList: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userListFilmRemove: (token: string, idList: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userListFilmCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  data: any;
  sizeIcons: number;
  loading?: boolean;
}

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
  loading = false,
}: WatchListButtonProps) {
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

  if (loading) {
    return (
      <div style={{ pointerEvents: 'none' }}>
        <LoadingOutlined style={{ fontSize: `${sizeIcons}px` }} />
      </div>
    );
  }

  return (
    <div onClick={handleWatchListClick} className='flex flex-col gap-1 items-center justify-center py-5'>
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
