import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthContext, ILoginEvent, ISignupEvent, IUser, IRootState } from './type';
import { useSnackbar } from './notificationContext';
import { useTranslation } from "react-i18next";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // URL de l'API
  headers: {
    'Access-Control-Allow-Origin': '*', // Autoriser les requêtes de n'importe quelle origine (CORS) (à des fins de test uniquement)
    'Accept-Language': 'fr',
  },
});


const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { notification } = useSnackbar();
  const { i18n } = useTranslation();

    const handleChangeLanguage = (language: string) => {
      const newLanguage = language;
      i18n.changeLanguage(newLanguage);
      instance.defaults.headers['Accept-Language'] = newLanguage;
    }
  const [xsrfToken, setXsrfToken] = useState(useSelector((state: IRootState) => state.xsrfToken?.xsrfToken));
  instance.defaults.headers['x-xsrf-token'] = xsrfToken;

  instance.interceptors.response.use(
    async (response) => {
      const token = response.data.xsrfToken || response.data.additionalData?.xsrfToken;
      if (token) {
        dispatch({
          type: 'UPDATE_XSRF',
          payload: token
        });
        setXsrfToken(token);
        instance.defaults.headers['x-xsrf-token'] = token;
      } else if (!token && xsrfToken && !instance.defaults.headers['x-xsrf-token']) {
        console.warn("Token retrieval from redux");
        instance.defaults.headers['x-xsrf-token'] = xsrfToken; 
      } else if (!token && !xsrfToken && !instance.defaults.headers['x-xsrf-token']){
        console.warn("No xsrfToken found in the response.");
      }
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401 && error.config.url !== '/refresh-token') {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshResponse = await instance.post('/refresh-token');
            const newToken = refreshResponse.data.xsrfToken;
            dispatch({
              type: 'UPDATE_XSRF',
              payload: newToken
            });
            setXsrfToken(newToken);
            instance.defaults.headers['x-xsrf-token'] = newToken;
            originalRequest.headers['x-xsrf-token'] = newToken;
            return instance(originalRequest);
          } catch (refreshError:unknown) {
            const axiosError = refreshError as AxiosError;
            console.error("Failed to retrieve the token:", axiosError.response?.status);
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {    
    dispatch({
      type: 'UPDATE_USER',
      payload: user
    });
  }, [user]);

  const reduxUser = useSelector((state: IRootState) => state.user);
  

  const isUserEmpty = (userObject: IUser | null) => {
    return !userObject || Object.values(userObject).some(value => value === "");
  };

  useEffect(() => {
    if (isUserEmpty(reduxUser)) {
      setUser(null);
    } else {
      setUser(reduxUser);
    }
  }, [reduxUser]);

  const login = (e: ILoginEvent) => {
    instance.post('login', {
      email: e.email,
      password: e.password
    })
    .then((response) => {
      const responseData = response.data;
      const user = responseData.user;
      notification('success', 'Connexion réussie');
      setUser(user);
    })
    .catch((error) => {
      const errorData = error.response.data;
      const errorMessage = errorData.message;
      notification('error', errorMessage);
      console.log(error);
    });
  };

  const logout = () => {
    instance.post('logout')
    dispatch({ type: 'CLEAR_USER'});
    dispatch({ type: 'CLEAR_XSRF'});
    setXsrfToken('');
    instance.defaults.headers['x-xsrf-token'] = '';
    setUser(null);
    console.log("logout");
  };

  const signup = (e: ISignupEvent) => {
    console.log("e",e);
    
    instance.post('signup', {
      email: e.email,
      password: e.password,
      username: e.username,
      lastname: e.lastname,
      passwordConfirmation: e.confirmPassword
    })
    .then((response) => {
      console.log(response);
      const responseData = response.data;

      const xsrfToken = responseData.xsrfToken;
      dispatch({
        type: 'UPDATE_XSRF',
        payload: xsrfToken
      });
      
      setXsrfToken(xsrfToken);
      const user = responseData.user;
      notification('success', 'Connexion réussie');
      setUser(user);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signup, handleChangeLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
