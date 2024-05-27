import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Helper function to get auth headers
const getAuthHeaders = (token) => {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Function to ApiError
const handleApiError = (error) => {
  throw error.response.data.error.message;
};

const makeRequest = async (method, url, token = null, data = null) => {
  const headers = token ? getAuthHeaders(token) : {};
  try {
    if (method === 'post' || method === 'put') {
      const response = await api({ method, url, data, ...headers });
      return response.data;
    }
    if (method === 'delete') {
      const response = await api({ method, url, ...headers });
      return response.data;
    }
    const response = await api({ method, url, ...headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ********* Method Requests *********
const makeGetRequest = async (url, token) => {
  return makeRequest('get', url, token);
};

const makeDeleteRequest = async (url, token) => {
  return makeRequest('delete', url, token);
};

const makePostWithoutTokenRequest = async (url, token = null, body) => {
  return makeRequest('post', url, token, body);
};

const makePostRequest = async (url, token, body) => {
  return makeRequest('post', url, token, body);
};

const makePutRequest = async (url, token, body) => {
  return makeRequest('put', url, token, body);
};

// ********* General Endpoints *********
export async function Filmes_GET(endpoint) {
  return makeGetRequest(endpoint, null);
}

export async function userLogin_GET(token) {
  return await api
    .get('/users/me', getAuthHeaders(token))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function userProfile_GET(token) {
  return makeGetRequest(
    '/users/me?populate=reviews&populate=like_films&populate=watchlist_films.filmes&populate=watched&populate=rating_films',
    token,
  );
}

export async function userLogin_POST(userData) {
  return makePostWithoutTokenRequest('/auth/local', null, userData);
}

export async function userRegister_POST(userData) {
  return makePostWithoutTokenRequest(`/auth/local/register`, null, userData);
}

export async function userPasswordLost_POST(emailUser) {
  return makePostWithoutTokenRequest(`/auth/forgot-password`, null, emailUser);
}

// ********* Like endpoints *********

// Create the user's like ID
export async function userLikeFilms_POST(token, body) {
  return makePostRequest('/like-films', token, body);
}
// Movies that the user has already liked
export async function userLikeFilms_GET(token) {
  const { like_films } = await makeGetRequest(
    '/users/me/?populate=like_films',
    token,
  );
  if (like_films.length !== 0) {
    return like_films[0].id;
  }
  return null;
}

// Movies based on id Like
export async function FilmsIdFromLikeId_GET(likeId, token) {
  return makeGetRequest(`/like-films/${likeId}?populate=filme`, token).then(
    (response) => {
      if (response.data.attributes.filme.data) {
        return response.data.attributes.filme.data;
      }
      return null;
    },
  );
}

// Update id Like Movies list
export async function userLikeFilms_PUT(token, idLike, body) {
  return makePutRequest(`/like-films/${idLike}`, token, body);
}

export async function userReview_POST(token, body) {
  return makePostRequest(`/reviews`, token, body);
}

export async function allReviewsbyFilmId_GET(token, rulePagination, idFilm) {
  return makeGetRequest(
    `/reviews?${rulePagination}&filters[filme][id][$eq]=${idFilm}&populate=user.avatar`,
    token,
  );
}

export async function uploadAvatar_POST(bodyFormData, token) {
  return makePostRequest(`upload`, token, bodyFormData);
}

export async function showAvatar_GET(token) {
  return makeGetRequest(`/users/me?populate=avatar`, token);
}

// ********* WatchList endpoints *********

export async function FilmsIdFromWatchListId_GET(watchListId, token) {
  return makeGetRequest(
    `/watchlist-films/${watchListId}?populate=filmes.card`,
    token,
  ).then((response) => {
    return response.data.attributes.filmes.data;
  });
}

// Create the user's watchlist ID because doesnt exist
export async function userListFilms_POST(token, body) {
  return makePostRequest(`/watchlist-films`, token, body);
}

// Movies that the user has already add to list
export async function userListFilms_GET(token) {
  return makeGetRequest(`/users/me/?populate=watchlist_films`, token).then(
    (response) => {
      if (response.watchlist_films.id !== null) {
        return response.watchlist_films.id;
      }
      return null;
    },
  );
}

export async function userListFilms_PUT(token, watchListId, body) {
  return makePutRequest(
    `/watchlist-films/${watchListId}?populate=*`,
    token,
    body,
  );
}

// ********* Watch endpoints *********

export async function FilmsIdFromWatchId_GET(watchId, token) {
  return makeGetRequest(`/watcheds/${watchId}?populate=filmes`, token).then(
    (response) => {
      if (response.data.attributes.filmes.data) {
        return response.data.attributes.filmes.data;
      }
      return null;
    },
  );
}

// Create the user's watchID because doesnt exist
export async function userWatchedFilms_POST(token, body) {
  return makePostRequest('/watcheds', token, body);
}

// Movies that the user has already add to list
export async function userWatchedFilms_GET(token) {
  return makeGetRequest('/users/me/?populate=watched', token).then(
    (response) => {
      if (response.watched !== null) {
        return response.watched.id;
      }
    },
  );
}

export async function userWatchedFilms_PUT(token, watchedId, body) {
  return makePutRequest(`/watcheds/${watchedId}?populate=*`, token, body);
}

// ********* Rate endpoints *********

export async function FilmsIdFromRateId_GET(rateId, token) {
  return makeGetRequest(`/rating-films/${rateId}?populate=filme`, token).then(
    (response) => {
      return response.data.attributes.filmes.data;
    },
  );
}

// Create the user's rateID because doesnt exist
export async function userRateFilms_POST(token, body) {
  return makePostRequest(`/rating-films`, token, body);
}

// Movies that the user has already add to list
export async function userRateFilms_GET(token) {
  return makeGetRequest('/users/me?populate=rating_films.filme', token).then(
    (response) => {
      if (response.rating_films.length !== 0) {
        return response.rating_films;
      }
      return null;
    },
  );
}

export async function userRateFilms_PUT(token, rateId, body) {
  return makePutRequest(`/rating-films/${rateId}?populate=*`, token, body);
}

export async function userRateFilm_DELETE(token, rateId) {
  return makeDeleteRequest(`/rating-films/${rateId}`, token);
}
