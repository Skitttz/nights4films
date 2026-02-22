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
  userLogin_GET,
  userLogin_POST,
  userProfile_GET,
  userRateFilm_DELETE,
  userRateFilms_GET,
  userRateFilms_POST,
  userRateFilms_PUT,
  userRegister_POST,
  userReview_POST,
  userWatchedFilms_POST,
  userWatchedFilms_PUT,
} from '../api/index';
import { translateErrorMessage } from '../components/Helper/Translate';

interface UserContextType {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  userPasswordLost: (email: string) => Promise<void>;
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
  data: any;
  dataProfile: any;
  login: boolean | null;
  loading: boolean;
  error: string | null;
}

export const useUser = createContext<UserContextType | null>(null);
export const tokenUserLocal = window.localStorage.getItem('token');

interface UserStorageProps {
  children: ReactNode;
}

export const UserStorage = ({ children }: UserStorageProps) => {
  const [data, setData] = useState<any>(null);
  const [dataProfile, setDataProfile] = useState<any>(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function getUser(token: string) {
    try {
      const dataUserGet = await userLogin_GET(token);
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
      await userRegister_POST({
        email: email,
        username: username,
        password: password,
      });

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
      const userDataPOST = await userLogin_POST({
        username: username,
        password: password,
      });
      const token = userDataPOST.jwt;
      window.localStorage.setItem('token', token);
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
      // await userPasswordLost_POST({
      //   email: email,
      // });
    } catch (error: any) {
      setError(error.message);
    } finally {
      alert('AVISO: Funcionalidade em Desenvolvimento');
      setLoading(false);
    }
  }

  async function getUserProfile(token: string) {
    try {
      const dataUserProfile = await userProfile_GET(token);
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
      setLoading(true);
      await userLikeFilms_POST(token, {
        data: {
          hasLiked: true,
          filme: idFilm,
          user: idUser,
        },
      });
      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLikeFilmUpdate(token: string, idLike: any, idFilm: any[], idNewFilm: any) {
    try {
      setLoading(true);
      await userLikeFilms_PUT(token, idLike, {
        data: {
          filme: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLikeFilmRemove(token: string, idLike: any, idFilm: any[], idToRemove: any) {
    try {
      setLoading(true);
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userLikeFilms_PUT(token, idLike, {
        data: {
          filme: updatedFilms,
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userListFilms ******

  async function userListFilmCreateId(token: string, idFilm: any, idUser: any) {
    try {
      setLoading(true);
      await userListFilms_POST(token, {
        data: {
          hasEntryList: true,
          filmes: idFilm,
          user: idUser,
        },
      });
      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userListFilmUpdate(token: string, idList: any, idFilm: any[], idNewFilm: any) {
    try {
      setLoading(true);
      await userListFilms_PUT(token, idList, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userListFilmRemove(token: string, idList: any, idFilm: any[], idToRemove: any) {
    try {
      setLoading(true);
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userListFilms_PUT(token, idList, {
        data: {
          filmes: updatedFilms,
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userWatched ******

  async function userWatchedCreateId(token: string, idFilm: any, idUser: any) {
    try {
      setLoading(true);
      await userWatchedFilms_POST(token, {
        data: {
          hasWatched: true,
          filmes: idFilm,
          user: idUser,
        },
      });
      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userWatchedUpdate(token: string, idWatched: any, idFilm: any[], idNewFilm: any) {
    try {
      setLoading(true);
      await userWatchedFilms_PUT(token, idWatched, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userWatchedRemove(token: string, idWatched: any, idFilm: any[], idToRemove: any) {
    try {
      setLoading(true);
      // New list of movies without idToRemove
      const updatedFilms = idFilm.filter((film) => film.id !== idToRemove.id);

      await userWatchedFilms_PUT(token, idWatched, {
        data: {
          filmes: updatedFilms,
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userRate ******

  async function userRateCreateId(token: string, idFilm: any, rateValue: number, idUser: any) {
    try {
      setLoading(true);
      await userRateFilms_POST(token, {
        data: {
          user: idUser,
          filme: idFilm,
          ratingValue: rateValue,
        },
      });
      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userRateUpdate(token: string, idRate: any, idFilm: any, newValue: number) {
    try {
      setLoading(true);
      await userRateFilms_PUT(token, idRate, {
        data: {
          filme: idFilm,
          ratingValue: newValue,
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userRateRemove(token: string, idRate: any) {
    try {
      setLoading(true);
      const IdRatesUser = await userRateFilms_GET(token);
      const IdRateUserExist = IdRatesUser.some((rate: any) => rate.id === idRate);
      if (!IdRateUserExist) {
        throw new Error();
      }
      setError(null);
      return await userRateFilm_DELETE(token, idRate);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** Create Review ******

  async function userCreateReview(token: string, content: string, idFilm: any, idUser: any, hasSpoiler: boolean) {
    try {
      setLoading(true);
      await userReview_POST(token, {
        data: {
          reviewContent: content,
          filme: idFilm,
          user: idUser,
          hasSpoiler,
        },
      });

      setError(null);
    } catch (err: any) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          await getUser(token);
        } catch (err: any) {
          userLogout();
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
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
