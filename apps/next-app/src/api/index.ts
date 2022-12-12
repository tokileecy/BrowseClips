import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const runtimeConfig =
  typeof document === 'undefined' ? serverRuntimeConfig : publicRuntimeConfig;

const { NEST_URL } = runtimeConfig;

const uri = new URL('', NEST_URL).href;

const apiInstance = axios.create({
  baseURL: uri,
  timeout: 10000,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

let jwt = '';

export const setJwt = (value: string) => {
  jwt = value;
  apiInstance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export default apiInstance;
