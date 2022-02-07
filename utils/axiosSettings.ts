import axios, { AxiosResponse } from 'axios';
import { firebaseAuth } from '../firebase/config';
import { defaultApiConfig } from './api';

const mainAxios = () => {
  const instance = axios.create({
    baseURL: defaultApiConfig.baseURL,
    headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` },
    timeout: defaultApiConfig.timeout
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.response.status === 401 && firebaseAuth.currentUser) {
        const newToken = (await firebaseAuth.currentUser.getIdTokenResult()).token;
        window.localStorage.setItem('access_token', newToken);
        const res = await axios
          .request({
            ...err.config,
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
            }
          })
          .catch((err) => {
            window.location.href = '/';
          });
        return res;
      }
    }
  );

  return instance;
};

type methods = 'get' | 'post' | 'put' | 'delete';

export const apiFactory = async <T>(method: methods, endpoint: string, params?: object) => {
  switch (method) {
    case 'get': {
      const res: AxiosResponse<T> = await mainAxios().get(endpoint);
      return res;
    }
    case 'post': {
      const res: AxiosResponse<T> = await mainAxios().post(endpoint, params);
      return res;
    }
    case 'put': {
      const res: AxiosResponse<T> = await mainAxios().put(endpoint, params);
      return res;
    }
    case 'delete': {
      const res: AxiosResponse<T> = await mainAxios().delete(endpoint);
      return res;
    }
  }
};
