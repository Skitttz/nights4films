import { makeGetRequest } from './Requests';

export async function Filmes_GET(endpoint: string, signal?: AbortSignal) {
  return makeGetRequest(endpoint, null, signal);
}
