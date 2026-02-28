import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  userLikeFilms_POST,
  userLikeFilms_PUT,
  userListFilms_POST,
  userListFilms_PUT,
  userRateFilm_DELETE,
  userRateFilms_GET,
  userRateFilms_POST,
  userRateFilms_PUT,
  userReview_POST,
  userWatchedFilms_POST,
  userWatchedFilms_PUT,
} from '../api/index';
import {
  loginAndStoreToken,
  fetchCurrentUser,
  registerUser,
  forgotPasswordRequest,
  resetPasswordRequest,
  fetchProfile,
  logoutAndClearToken,
} from '../controllers/userController';
import { translateErrorMessage } from '../components/Helper/Translate';
import { getCookie } from '../utils/cookieManager';
import { getTokenCookieName } from '../constants/cookies';

interface UserContextType {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  userPasswordLost: (email: string) => Promise<void>;
  userPasswordReset: (code: string, password: string, passwordConfirmation: string) => Promise<void>;
  userRegister: (email: string, username: string, password: string) => Promise<void>;
  userLikeFilmCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  userLikeFilmUpdate: (token: string, idLike: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userLikeFilmRemove: (token: string, idLike: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userListFilmCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  userListFilmUpdate: (token: string, idList: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userListFilmRemove: (token: string, idList: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userCreateReview: (token: string, content: string, idFilm: any, idUser: any, hasSpoiler: boolean) => Promise<void>;
  userWatchedCreateId: (token: string, idFilm: any, idUser: any) => Promise<void>;
  userWatchedUpdate: (token: string, idWatched: any, idFilm: any[], idNewFilm: any) => Promise<void>;
  userWatchedRemove: (token: string, idWatched: any, idFilm: any[], idToRemove: any) => Promise<void>;
  userRateCreateId: (token: string, idFilm: any, rateValue: number, idUser: any) => Promise<void>;
  userRateUpdate: (token: string, idRate: any, idFilm: any, newValue: number) => Promise<void>;
  userRateRemove: (token: string, idRate: any) => Promise<void>;
  getUserProfile: (token: string) => Promise<void>;
  token: string | null;
  data: any;
  dataProfile: any;
  login: boolean | null;
  loading: boolean;
  error: string | null;
}

export const useUser = createContext<UserContextType | null>(null);

export const tokenUserLocal = getCookie(getTokenCookieName());

interface UserStorageProps {
  children: ReactNode;
}

export const UserStorage = ({ children }: UserStorageProps) => {
  const [data, setData] = useState<any>(null);
  const [dataProfile, setDataProfile] = useState<any>(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => getCookie(getTokenCookieName()));
  const navigate = useNavigate();

  async function getUser(token: string) {
    try {
      const dataUserGet = await fetchCurrentUser(token);
      setData(dataUserGet);
      setLogin(true);
    } catch (error) {
      console.error(error);
      userLogout();
    }
  }

  async function userRegister(email: string, username: string, password: string) {
    try {
      setLoading(true);
      await registerUser({ email, username, password });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { token } = await loginAndStoreToken(username, password);
      setToken(token);
      await getUser(token);
      navigate('/');
    } catch (err: any) {
      setError(translateErrorMessage(err));
      setTimeout(() => {
        setError(null);
      }, 20000);
    } finally {
      setLoading(false);
    }
  }

  async function userPasswordLost(email: string) {
    try {
      setError(null);
      setLoading(true);
      await forgotPasswordRequest(email);
    } catch (error: any) {
      const msg = translateErrorMessage(error);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function userPasswordReset(code: string, password: string, passwordConfirmation: string) {
    try {
      setError(null);
      setLoading(true);
      await resetPasswordRequest({ code, password, passwordConfirmation });
    } catch (error: any) {
      const msg = translateErrorMessage(error);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function getUserProfile(token: string) {
    try {
      const dataUserProfile = await fetchProfile(token);
      setDataProfile(dataUserProfile);
      setLogin(true);
    } catch (error) {
      console.error(error);
      userLogout();
    }
  }

  // ****** userLike ******
  async function userLikeFilmCreateId(token: string, idFilm: any, idUser: any) {
    try {
      await userLikeFilms_POST(token, {
        data: {
          hasLiked: true,
          filme: idFilm,
          user: idUser,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userLikeFilmUpdate(token: string, idLike: any, idFilm: any[], idNewFilm: any) {
    try {
      await userLikeFilms_PUT(token, idLike, {
        data: {
          filme: [...idFilm, idNewFilm],
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userLikeFilmRemove(token: string, idLike: any, idFilm: any[], idToRemove: any) {
    try {
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userLikeFilms_PUT(token, idLike, {
        data: {
          filme: updatedFilms,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  // ****** userListFilms ******

  async function userListFilmCreateId(token: string, idFilm: any, idUser: any) {
    try {
      await userListFilms_POST(token, {
        data: {
          hasEntryList: true,
          filmes: idFilm,
          user: idUser,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userListFilmUpdate(token: string, idList: any, idFilm: any[], idNewFilm: any) {
    try {
      await userListFilms_PUT(token, idList, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userListFilmRemove(token: string, idList: any, idFilm: any[], idToRemove: any) {
    try {
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userListFilms_PUT(token, idList, {
        data: {
          filmes: updatedFilms,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  // ****** userWatched ******

  async function userWatchedCreateId(token: string, idFilm: any, idUser: any) {
    try {
      await userWatchedFilms_POST(token, {
        data: {
          hasWatched: true,
          filmes: idFilm,
          user: idUser,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userWatchedUpdate(token: string, idWatched: any, idFilm: any[], idNewFilm: any) {
    try {
      await userWatchedFilms_PUT(token, idWatched, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userWatchedRemove(token: string, idWatched: any, idFilm: any[], idToRemove: any) {
    try {
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userWatchedFilms_PUT(token, idWatched, {
        data: {
          filmes: updatedFilms,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  // ****** userRate ******

  async function userRateCreateId(token: string, idFilm: any, rateValue: number, idUser: any) {
    try {
      await userRateFilms_POST(token, {
        data: {
          user: idUser,
          filme: idFilm,
          ratingValue: rateValue,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userRateUpdate(token: string, idRate: any, idFilm: any, newValue: number) {
    try {
      await userRateFilms_PUT(token, idRate, {
        data: {
          filme: idFilm,
          ratingValue: newValue,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  async function userRateRemove(token: string, idRate: any) {
    try {
      const IdRatesUser = await userRateFilms_GET(token);
      const IdRateUserExist = IdRatesUser.some((rate: any) => rate.id === idRate);
      if (!IdRateUserExist) {
        throw new Error();
      }
      await userRateFilm_DELETE(token, idRate);
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  // ****** Create Review ******

  async function userCreateReview(token: string, content: string, idFilm: any, idUser: any, hasSpoiler: boolean) {
    try {
      await userReview_POST(token, {
        data: {
          reviewContent: content,
          filme: idFilm,
          user: idUser,
          hasSpoiler,
        },
      });
    } catch (err: any) {
      console.error(translateErrorMessage(err));
    }
  }

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    setToken(null);
    await logoutAndClearToken();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function autoLogin() {
      const token = getCookie(getTokenCookieName());
      if (token) {
        try {
          setError(null);
          setLoading(true);
          setToken(token);
          await getUser(token);
        } catch (err: any) {
          userLogout();
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
        setToken(null);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <useUser.Provider
      value={{
        userLogin,
        userLogout,
        userPasswordLost,
        userPasswordReset,
        userRegister,
        userLikeFilmCreateId,
        userLikeFilmUpdate,
        userLikeFilmRemove,
        userListFilmCreateId,
        userListFilmUpdate,
        userListFilmRemove,
        userCreateReview,
        userWatchedCreateId,
        userWatchedUpdate,
        userWatchedRemove,
        userRateCreateId,
        userRateUpdate,
        userRateRemove,
        getUserProfile,
        token,
        data,
        dataProfile,
        login,
        loading,
        error,
      }}
    >
      {children}
    </useUser.Provider>
  );
};

export function useUserContext() {
  const context = useContext(useUser);

  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }

  return context;
}
