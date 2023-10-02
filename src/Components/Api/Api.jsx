import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const hostURL_GET = import.meta.env.VITE_HOST_URL;

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
