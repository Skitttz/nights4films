import { HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { FilmsIdFromLikeId_GET } from '../../../api/index';

interface LikeButtonProps {
  like: boolean;
  likeId: string;
  tokenUserLocal: string;
  films: any;
  userContainsLikeId: (token: string) => Promise<boolean>;
  userLikeFilmUpdate: (token: string, idLike: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userLikeFilmRemove: (token: string, idLike: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userLikeFilmCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  data: any;
  sizeIcons: number;
  loading?: boolean;
}

function LikeButton({
  like,
  likeId,
  tokenUserLocal,
  films,
  userContainsLikeId,
  userLikeFilmUpdate,
  userLikeFilmRemove,
  userLikeFilmCreateId,
  data,
  sizeIcons,
  loading = false,
}: LikeButtonProps) {
  const handleLikeClick = async () => {
    if (like) {
      const likeIdFilms = await FilmsIdFromLikeId_GET(likeId, tokenUserLocal);
      userLikeFilmRemove(tokenUserLocal, likeId, likeIdFilms, films.data[0]);
    } else {
      const containsLiked = await userContainsLikeId(tokenUserLocal);
      if (containsLiked && likeId) {
        const likeIdFilms = await FilmsIdFromLikeId_GET(likeId, tokenUserLocal);
        userLikeFilmUpdate(tokenUserLocal, likeId, likeIdFilms, films.data[0]);
      } else {
        const { id: idUser } = data;
        userLikeFilmCreateId(tokenUserLocal, films.data[0].id, idUser);
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
    <div onClick={handleLikeClick} className='flex flex-col gap-1 items-center justify-center py-5'>
      {like ? (
        <>
          <HeartFilled
            style={{ color: '#a51f1f', fontSize: `${sizeIcons}px` }}
          />
          <p className="text-slate-400">Liked</p>
        </>
      ) : (
        <>
          <HeartOutlined style={{ fontSize: `${sizeIcons}px` }} />
          <p className="text-slate-400">Like</p>
        </>
      )}
    </div>
  );
}

export default LikeButton;
