import { makeGetRequest } from './Requests';

export async function Filmes_GET(endpoint) {
  return makeGetRequest(endpoint, null);
}
