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

export async function UserLogin_POST(endpoint, userData) {
  return await api
    .post(endpoint, userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function UserRegister_POST(endpoint, userData) {
  return await api
    .post(endpoint, userData)
    .then((response) => {
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
    })
    .catch((error) => {
      throw error;
    });
}
