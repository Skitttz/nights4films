import { makeGetRequest } from './Requests';

const FILM_REQUEST_TIMEOUT_MS = 60_000;

export async function Filmes_GET(endpoint: string, signal?: AbortSignal) {
  return makeGetRequest(endpoint, null, signal, FILM_REQUEST_TIMEOUT_MS);
}
