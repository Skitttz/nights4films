import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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

export const useUser = createContext();
export const tokenUserLocal = window.localStorage.getItem('token');
export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    try {
      const dataUserGet = await userLogin_GET(token);
      setData(dataUserGet);
      setLogin(true);
    } catch (error) {
      console.error(error);
      userLogout();
    }
  }

  async function userRegister(email, username, password) {
    try {
      setLoading(true);
      await userRegister_POST({
        email: email,
        username: username,
        password: password,
      });

      setError(null);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(username, password) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
      setTimeout(() => {
        setError(null);
      }, 20000);
    } finally {
      setLoading(false);
    }
  }

  async function userPasswordLost(email) {
    try {
      setError(null);
      setLoading(true);
      // await userPasswordLost_POST({
      //   email: email,
      // });
    } catch (error) {
      setError(error.message);
    } finally {
      alert('AVISO: Funcionalidade em Desenvolvimento');
      setLoading(false);
    }
  }

  async function getUserProfile(token) {
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
  async function userLikeFilmCreateId(token, idFilm, idUser) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLikeFilmUpdate(token, idLike, idFilm, idNewFilm) {
    try {
      setLoading(true);
      await userLikeFilms_PUT(token, idLike, {
        data: {
          filme: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userLikeFilmRemove(token, idLike, idFilm, idToRemove) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userListFilms ******

  async function userListFilmCreateId(token, idFilm, idUser) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userListFilmUpdate(token, idList, idFilm, idNewFilm) {
    try {
      setLoading(true);
      await userListFilms_PUT(token, idList, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userListFilmRemove(token, idList, idFilm, idToRemove) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userWatched ******

  async function userWatchedCreateId(token, idFilm, idUser) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userWatchedUpdate(token, idWatched, idFilm, idNewFilm) {
    try {
      setLoading(true);
      await userWatchedFilms_PUT(token, idWatched, {
        data: {
          filmes: [...idFilm, idNewFilm],
        },
      });

      setError(null);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userWatchedRemove(token, idWatched, idFilm, idToRemove) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** userRate ******

  async function userRateCreateId(token, idFilm, rateValue, idUser) {
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
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userRateUpdate(token, idRate, idFilm, newValue) {
    try {
      setLoading(true);
      await userRateFilms_PUT(token, idRate, {
        data: {
          filme: idFilm,
          ratingValue: newValue,
        },
      });

      setError(null);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function userRateRemove(token, idRate) {
    try {
      setLoading(true);
      const IdRatesUser = await userRateFilms_GET(token);
      const IdRateUserExist = IdRatesUser.some((rate) => rate.id === idRate);
      if (!IdRateUserExist) {
        throw new Error();
      }
      setError(null);
      return await userRateFilm_DELETE(token, idRate);
    } catch (err) {
      setError(translateErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // ****** Create Review ******

  async function userCreateReview(token, content, idFilm, idUser, hasSpoiler) {
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
    } catch (err) {
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
        } catch (err) {
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
