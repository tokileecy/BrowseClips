import axios from 'axios';
import qs from 'qs';

const NEST_URL = process.env.NEST_URL;
const uri = new URL('', NEST_URL).href;

/** @type {import('axios').AxiosInstance} */
const instance = axios.create({
  baseURL: uri,
  timeout: 10000,
});

instance.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

export default instance;
