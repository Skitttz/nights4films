export type User = {
  id: number;
  username: string;
  email: string;
};

export type UserMe = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WatchlistFilms = {
  id: number;
  createdAt: string;
  updatedAt: string;
  hasEntryList: boolean;
};

export type UserMeWithWatchlist = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  watchlist_films: WatchlistFilms | null;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type RatingFilmMovie = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  year: string;
  duration: number;
  trailer: string;
  slug: string;
  curiosities: string;
};

export type RatingFilm = {
  id: number;
  createdAt: string;
  updatedAt: string;
  ratingValue: number;
  filme: RatingFilmMovie;
};

export type UserMeWithRatings = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  rating_films: RatingFilm[];
};

export type LikeFilm = {
  id: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserMeWithLikes = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  like_films: LikeFilm[];
};

export type Watched = {
  id: number;
  hasWatched: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserMeWithWatched = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  watched: Watched | null;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export type ResetPasswordPayload = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

export type ForgotPasswordPayload = {
  email: string;
};
