import { Api } from '@browse_clips/api';
import getConfig from 'next/config';
export * as API from '@browse_clips/api';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const runtimeConfig =
  typeof document === 'undefined' ? serverRuntimeConfig : publicRuntimeConfig;

const { NEST_URL } = runtimeConfig;

const uri = new URL('', NEST_URL).href;

const api = new Api({
  baseURL: uri,
});

api.apiInstance.interceptors.response.use(
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

export default api;
