import React from 'react';
import {
  userLogin_GET,
  userLogin_POST,
  userPasswordLost_POST,
  userRegister_POST,
} from '../Components/Api/Api';
import { useNavigate } from 'react-router-dom';

export const useUser = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    try {
      const dataUserGet = await userLogin_GET(token);
      setData(dataUserGet);
      setLogin(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function userRegister(email, username, password) {
    try {
      setError(null);
      setLoading(true);
      await userRegister_POST({
        email: email,
        username: username,
        password: password,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const userDataPOST = await userLogin_POST({
        identifier: username,
        password: password,
      });
      const token = userDataPOST.jwt;
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/');
    } catch (err) {
      setError(err.message);
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
      alert('A parte de recuperar a senha ainda está em desenvolvimento');
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  React.useEffect(() => {
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
        data,
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
  const context = React.useContext(useUser);

  if (!context) {
    throw new Error('Hook deve ser usado como provider');
  }

  return context;
}
