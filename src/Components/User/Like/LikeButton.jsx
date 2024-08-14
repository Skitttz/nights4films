import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons'; // Importe as bibliotecas corretas
import { FilmsIdFromLikeId_GET } from '../../../Api/index';

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
}) {
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

  return (
    <div onClick={handleLikeClick}>
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
