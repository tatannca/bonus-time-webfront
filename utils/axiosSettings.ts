import axios, { AxiosResponse } from 'axios';
import { defaultApiConfig, endpoints } from './api';

const mainAxios = () =>
  axios.create({
    baseURL: defaultApiConfig.baseURL,
    headers: { Authorization: `Bearer ${window.localStorage.getItem('access_token')}` },
    timeout: defaultApiConfig.timeout
  });

type methods = 'get' | 'post' | 'put' | 'delete';

export const apiFactory = async <T>(method: methods, endpoint: string) => {
  switch (method) {
    case 'get': {
      const data: AxiosResponse<T> = await mainAxios().get(endpoint);
      return data;
    }
    case 'post': {
      const data: AxiosResponse<T> = await mainAxios().post(endpoint);
      return data;
    }
    case 'put': {
      const data: AxiosResponse<T> = await mainAxios().put(endpoint);
      return data;
    }
    case 'delete': {
      const data: AxiosResponse<T> = await mainAxios().delete(endpoint);
      return data;
    }
  }
};
