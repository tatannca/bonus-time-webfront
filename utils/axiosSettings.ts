import axios, { AxiosResponse } from 'axios';
import { defaultApiConfig } from './api';

const mainAxios = () =>
  axios.create({
    baseURL: defaultApiConfig.baseURL,
    headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` },
    timeout: defaultApiConfig.timeout
  });

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
