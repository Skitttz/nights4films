import { makeGetRequest } from './Requests';

export async function Filmes_GET(endpoint: string) {
  return makeGetRequest(endpoint, null);
}
