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
