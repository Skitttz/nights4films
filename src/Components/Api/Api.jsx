import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// export const hostURL_GET = import.meta.env.VITE_HOST_URL;

const auth = {
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
};

const params = {
  params: {
    populate: ['card'],
  },
};

export async function Filmes_GET(endpoint) {
  return await api
    .get(endpoint) // Por enquanto sem autenticar //.get(endpoint,auth)//
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function userLogin_GET(token) {
  return await api
    .get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function userProfile_GET(token) {
  return await api
    .get(
      '/users/me?populate=reviews&populate=like_films&populate=watchlist_films.filmes&populate=watched&populate=rating_films',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function userLogin_POST(userData) {
  return await api
    .post(`/auth/local`, userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

export async function userRegister_POST(userData) {
  return await api
    .post(`/auth/local/register`, userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

export async function userPasswordLost_POST(emailUser) {
  return await api
    .post(`/auth/forgot-password'`, { email: emailUser })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

// ********* Like endpoints *********

// Create the user's like ID
export async function userLikeFilms_POST(token, body) {
  return await api
    .post(`/like-films`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}
// Movies that the user has already liked
export async function userLikeFilms_GET(token) {
  return await api
    .get('/users/me/?populate=like_films', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.like_films.length !== 0) {
        return response.data.like_films[0].id;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw error;
    });
}

// Movies based on id Like
export async function FilmsIdFromLikeId_GET(likeId, token) {
  return await api
    .get(`/like-films/${likeId}?populate=filme`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data.attributes.filme.data;
    })
    .catch((error) => {
      throw error;
    });
}

// Update id Like Movies list
export async function userLikeFilms_PUT(token, idLike, body) {
  return await api
    .put(`/like-films/${idLike}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

export async function userReview_POST(token, body) {
  return await api
    .post(`/reviews`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

export async function allReviewsbyFilmId_GET(token, rulePagination, idFilm) {
  return await api
    .get(
      `/reviews?${rulePagination}&filters[filme][id][$eq]=${idFilm}&populate=user.avatar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function uploadAvatar_POST(bodyFormData, token) {
  return await api
    .post(`/upload`, bodyFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function showAvatar_GET(token) {
  return await api
    .get(`/users/me?populate=avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

// ********* WatchList endpoints *********

export async function FilmsIdFromWatchListId_GET(watchListId, token) {
  return await api
    .get(`/watchlist-films/${watchListId}?populate=filmes.card`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data.attributes.filmes.data;
    })
    .catch((error) => {
      throw error;
    });
}

// Create the user's watchlist ID because doesnt exist
export async function userListFilms_POST(token, body) {
  return await api
    .post(`/watchlist-films`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

// Movies that the user has already add to list
export async function userListFilms_GET(token) {
  return await api
    .get('/users/me/?populate=watchlist_films', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.watchlist_films !== null) {
        return response.data.watchlist_films.id;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw error;
    });
}

export async function userListFilms_PUT(token, watchListId, body) {
  return await api
    .put(`/watchlist-films/${watchListId}?populate=*`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

// ********* Watch endpoints *********

export async function FilmsIdFromWatchId_GET(watchId, token) {
  return await api
    .get(`/watcheds/${watchId}?populate=filmes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data.attributes.filmes.data;
    })
    .catch((error) => {
      throw error;
    });
}

// Create the user's watchID because doesnt exist
export async function userWatchedFilms_POST(token, body) {
  return await api
    .post(`/watcheds`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

// Movies that the user has already add to list
export async function userWatchedFilms_GET(token) {
  return await api
    .get('/users/me/?populate=watched', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.watched !== null) {
        return response.data.watched.id;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw error;
    });
}

export async function userWatchedFilms_PUT(token, watchedId, body) {
  return await api
    .put(`/watcheds/${watchedId}?populate=*`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

// ********* Rate endpoints *********

export async function FilmsIdFromRateId_GET(rateId, token) {
  return await api
    .get(`/rating-films/${rateId}?populate=filme`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data.attributes.filmes.data;
    })
    .catch((error) => {
      throw error;
    });
}

// Create the user's rateID because doesnt exist
export async function userRateFilms_POST(token, body) {
  return await api
    .post(`/rating-films`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

// Movies that the user has already add to list
export async function userRateFilms_GET(token) {
  return await api
    .get('/users/me?populate=rating_films.filme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.rating_films.length !== 0) {
        return response.data.rating_films;
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw error;
    });
}

export async function userRateFilms_PUT(token, rateId, body) {
  return await api
    .put(`/rating-films/${rateId}?populate=*`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}

export async function userRateFilm_DELETE(token, rateId) {
  return await api
    .delete(`/rating-films/${rateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
}
